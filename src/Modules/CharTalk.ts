import { BaseModule } from "../Base/BaseModule";
import { isSimpleChat } from "../Utilities/ChatMessages";
import { PlayerStorage } from "../Utilities/Data";
import { HookPriority, ModuleCategory, hookFunction } from "../Utilities/SDK";
import { ResponsesModule } from "./Responses";

/**
 * "Frown", "Sad", "Pained", "Angry", "HalfOpen", "Open", "Ahegao", "Moan",
 * "TonguePinch", "LipBite", "Happy", "Devious", "Laughing", "Grin", "Smirk", "Pout",
 */

/**
 * The detection map used to match chunks of speech to a character's facial expression.
 * It's sorted by priority.
 */
const letterExpressionMap: { regex: RegExp; expr: [string | null, number] }[] = [
  { regex: /[.?!…~]/, expr: [null, 600] },
  { regex: /[,;]/, expr: [null, 250] },
  //Latin
  { regex: /[a]/, expr: ["Open", 400] },
  { regex: /[oeu]/, expr: ["HalfOpen", 300] },
  { regex: /[bp]/, expr: [null, 200] },
  { regex: /[mn]/, expr: [null, 500] },
  { regex: /[ij]/, expr: ["Smirk", 400] },
  { regex: /[kqrw]/, expr: ["HalfOpen", 300] },
  { regex: /[fv]/, expr: ["LipBite", 300] },
  { regex: /[cdt]/, expr: ["TonguePinch", 200] },
  { regex: /[slz]/, expr: ["TonguePinch", 400] },
  { regex: /[ghx]/, expr: ["Angry", 300] },
  //Cyrillic
  { regex: /[ая]/, expr: ["Open", 400] },
  { regex: /[оеуєю]/, expr: ["HalfOpen", 300] },
  { regex: /[бп]/, expr: [null, 200] },
  { regex: /[мн]/, expr: [null, 500] },
  { regex: /[иіжїы]/, expr: ["Smirk", 400] },
  { regex: /[yкр]/, expr: ["HalfOpen", 300] },
  { regex: /[фв]/, expr: ["LipBite", 300] },
  { regex: /[цдт]/, expr: ["TonguePinch", 200] },
  { regex: /[слз]/, expr: ["TonguePinch", 400] },
  { regex: /[гх]/, expr: ["Angry", 300] }
];

export class CharTalkModule extends BaseModule {
  static doAnimateMouth: boolean = true;
  static currentRealExpression = new Map<number, ExpressionName>();
  /** The list of expressions to animate with their duration. */
  static animation: { [characterNumber: number]: [ExpressionName, number][] } = {};
  static currentExpression: { [characterNumber: number]: ExpressionName } = {};
  static animationFrame = 0;

  Load(): void {
    ChatRoomRegisterMessageHandler({
      Description: "Processes mouth moving on the client",
      Priority: 500,
      Callback: (data, sender, msg, metadata) => {
        if (data.Type == "Chat") {
          CharTalkModule.charTalkHandle(sender, msg);
          return false;
        }
      }
    });

    hookFunction(
      "CommonDrawAppearanceBuild",
      HookPriority.Observe,
      (args, next) => {
        const c: Character = args[0];

        if (!CharTalkModule.animation?.[c.MemberNumber]) return next(args); // Skip hook execution if animation not running

        const mouth = InventoryGet(c, "Mouth"); // Get mouth property

        if (!mouth) return next(args);

        if (!mouth.Property) mouth.Property = {};

        CharTalkModule.currentRealExpression.set(c.MemberNumber, mouth?.Property?.Expression || null); // Save the real expression

        mouth.Property.Expression = CharTalkModule.currentExpression?.[c.MemberNumber] || null; // Override the expression for this function

        const returnValue = next(args); // Call the hooked function

        mouth.Property.Expression = CharTalkModule.currentRealExpression.get(c.MemberNumber); // Restore the real expression for further execution

        return returnValue; // Preserve any possible return value
      },
      ModuleCategory.CharTalk
    );
  }

  /**
   * Gets the sent message, checks it for validity,
   * then splits it in chunks and turns it into a list of expression changes
   * before pushing them into the animator.
   */
  static animateSpeech(c: Character, msg: string) {
    const chunks = CharTalkModule.chunkSubstr(msg, 3);

    const animation = chunks.map((chunk) => {
      const match = letterExpressionMap.find(({ regex }) => regex.test(chunk)) ?? { expr: [null, 200] };
      return match.expr;
    });

    CharTalkModule.runExpressionAnimation(c, animation);
  }


  /**
   * Runs animation by changing mouth expression every `step[1]`ms
   */
  static runExpressionAnimationStep(c: Character) {
    if (!CharTalkModule.animation?.[c.MemberNumber]) return;

    let step = CharTalkModule.animation[c.MemberNumber][CharTalkModule.animationFrame++];

    CharTalkModule.setLocalMouthExpression(c, step?.[0]);

    if (CharTalkModule.animationFrame < CharTalkModule.animation?.[c.MemberNumber].length) {
      setTimeout(() => CharTalkModule.runExpressionAnimationStep(c), step[1]);
    } else {
      CharTalkModule.cleanup(c);
    }
  }

  static runExpressionAnimation(c: Character, list: any) {
    if (CharTalkModule.animation?.[c.MemberNumber]) return; // Animation running, ignore

    CharTalkModule.animation[c.MemberNumber] = list;
    CharTalkModule.animationFrame = 0;

    const mouth = InventoryGet(c, "Mouth")?.Property;

    if (mouth?.Expression && CharTalkModule.animation[c.MemberNumber] !== null) {
      // reset the mouth at the end
      CharTalkModule.animation?.[c.MemberNumber].push([mouth?.Expression, 0]);
    }

    CharTalkModule.runExpressionAnimationStep(c);
  }

  /**
   * Splits a string into chunks of "size" length
   */
  static chunkSubstr(str: string, size: number) {
    const numChunks = Math.ceil(str.length / size);
    const chunks = new Array(numChunks);

    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substring(o, o + size);
    }

    return chunks;
  }

  static setLocalMouthExpression(c: Character, expressionName: ExpressionName) {
    const mouth = InventoryGet(c, "Mouth");

    if (expressionName != null && !mouth.Asset.Group.AllowExpression.includes(expressionName)) return;

    CharTalkModule.currentExpression[c.MemberNumber] = expressionName;

    CharacterRefresh(c, false);
  }

  static charTalkHandle = (c: Character, msg: string) => {
    if (!PlayerStorage().GlobalModule.ResponsiveEnabled) return;
    if (!PlayerStorage().GlobalModule.CharTalkEnabled) return;
    if (!c) return;

    const fIsSimpleChat = !!isSimpleChat(msg);

    if (fIsSimpleChat && CharTalkModule.doAnimateMouth && c == Player && !ResponsesModule.isOrgasm) {
      CharTalkModule.animateSpeech(c, msg);
    } else if (fIsSimpleChat && CharTalkModule.doAnimateMouth && c != Player) {
      CharTalkModule.animateSpeech(c, msg);
    }

    if (!fIsSimpleChat) {
      CharTalkModule.doAnimateMouth = false;
      return;
    }

    if (fIsSimpleChat && !CharTalkModule.doAnimateMouth) {
      CharTalkModule.doAnimateMouth = true;
      CharTalkModule.animateSpeech(c, msg);
    }

    if (ResponsesModule.isOrgasm) {
      ResponsesModule.isOrgasm = false;
    }
  };

  static cleanup(c: Character) {
    delete CharTalkModule.animation[c.MemberNumber];
    CharTalkModule.setLocalMouthExpression(c, CharTalkModule.currentRealExpression.get(c.MemberNumber));
    CharTalkModule.currentRealExpression.delete(c.MemberNumber);
  };
}
