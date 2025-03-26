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
  { regex: /[a]/i, expr: ["Open", 400] },
  { regex: /[oeu]/i, expr: ["HalfOpen", 300] },
  { regex: /[bp]/i, expr: [null, 200] },
  { regex: /[mn]/i, expr: [null, 500] },
  { regex: /[ij]/i, expr: ["Smirk", 400] },
  { regex: /[kqrw]/i, expr: ["HalfOpen", 300] },
  { regex: /[fv]/i, expr: ["LipBite", 300] },
  { regex: /[cdt]/i, expr: ["TonguePinch", 200] },
  { regex: /[slz]/i, expr: ["TonguePinch", 400] },
  { regex: /[ghx]/i, expr: ["Angry", 300] },
  //Cyrillic
  { regex: /[ая]/i, expr: ["Open", 400] },
  { regex: /[оеуєю]/i, expr: ["HalfOpen", 300] },
  { regex: /[бп]/i, expr: [null, 200] },
  { regex: /[мн]/i, expr: [null, 500] },
  { regex: /[иіжїы]/i, expr: ["Smirk", 400] },
  { regex: /[yкр]/i, expr: ["HalfOpen", 300] },
  { regex: /[фв]/i, expr: ["LipBite", 300] },
  { regex: /[цдт]/i, expr: ["TonguePinch", 200] },
  { regex: /[слз]/i, expr: ["TonguePinch", 400] },
  { regex: /[гх]/i, expr: ["Angry", 300] }
];

interface CharTalkCharacterData {
  realExpression: ExpressionName;
  currentExpression: ExpressionName;
  /** The list of expressions to animate with their duration. */
  animation: [ExpressionName, number][];
  animationFrame: number;
}

export class CharTalkModule extends BaseModule {
  static characterData: Record<number, CharTalkCharacterData> = {};

  Load(): void {
    ChatRoomRegisterMessageHandler({
      Description: "Processes mouth moving on the client",
      Priority: 500,
      Callback: (data, sender, msg) => {
        if (data.Type === "Chat") CharTalkModule.charTalkHandle(sender, msg);

        return false;
      }
    });

    hookFunction(
      "CommonDrawAppearanceBuild",
      HookPriority.Observe,
      (args, next) => {
        const c: Character = args[0];

        if (!CharTalkModule.characterData[c.MemberNumber]) return next(args); // Skip hook execution if animation not running

        const mouth = InventoryGet(c, "Mouth"); // Get mouth property

        if (!mouth) return next(args);

        if (!mouth.Property) mouth.Property = {};

        CharTalkModule.characterData[c.MemberNumber].realExpression = mouth.Property.Expression || null; // Save the real expression

        mouth.Property.Expression = CharTalkModule.characterData[c.MemberNumber].currentExpression || null; // Override the expression for this function

        const returnValue = next(args); // Call the hooked function

        mouth.Property.Expression = CharTalkModule.characterData[c.MemberNumber].realExpression; // Restore the real expression for further execution

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
    const charData = CharTalkModule.characterData[c.MemberNumber];

    if (!charData.animation) return;

    let step = charData.animation[charData.animationFrame++];

    CharTalkModule.setLocalMouthExpression(c, step?.[0]);

    if (charData.animationFrame < charData.animation?.length) {
      setTimeout(() => CharTalkModule.runExpressionAnimationStep(c), step[1]);
    } else {
      CharTalkModule.cleanup(c);
    }
  }

  static runExpressionAnimation(c: Character, list: any) {
    const charData = CharTalkModule.characterData[c.MemberNumber] = {} as CharTalkCharacterData;

    if (charData.animation) return; // Animation running, ignore

    charData.animation = list ?? [];
    charData.animationFrame = 0;
    charData.currentExpression = null;
    charData.realExpression = null;

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

    CharTalkModule.characterData[c.MemberNumber].currentExpression = expressionName;

    CharacterRefresh(c, false);
  }

  static charTalkHandle = (c: Character, msg: string) => {
    if (!PlayerStorage().GlobalModule.ResponsiveEnabled) return;
    if (!PlayerStorage().GlobalModule.CharTalkEnabled) return;
    if (!c) return;

    if (CharTalkModule.characterData[c.MemberNumber]) {
      return;
    }

    const shouldAnimate = !!isSimpleChat(msg);

    if (shouldAnimate && c == Player && !ResponsesModule.isOrgasm) {
      CharTalkModule.animateSpeech(c, msg);
    } else if (shouldAnimate && c != Player) {
      CharTalkModule.animateSpeech(c, msg);
    }
  };

  static cleanup(c: Character) {
    CharTalkModule.setLocalMouthExpression(c, CharTalkModule.characterData[c.MemberNumber].realExpression);
    delete CharTalkModule.characterData[c.MemberNumber];
  };
}
