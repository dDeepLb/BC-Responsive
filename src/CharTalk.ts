// TODO Make expressions updates locally

import { GlobalModule } from "./Modules/Global";
import { isSimpleChat } from "./Utilities/ChatMessages";
import { HookPriority, ModuleCategory, SDK, hookFunction } from "./Utilities/SDK";

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
  { regex: /[гх]/, expr: ["Angry", 300] },
];

/**
 * Initializates everything for Character Talk work
 */
export function initCharTalk() {
  hookFunction(
    "ChatRoomSendChat",
    HookPriority.AddBehavior,
    (args, next) => {
      const charTalkEnabled = Player.BCResponsive.GlobalModule.CharTalkEnabled;
      const inputChat = ElementValue("InputChat").trim();
      const fIsSimpleChat = !!isSimpleChat(inputChat);

      if (!charTalkEnabled) {
        next(args);
        return;
      }

      if (fIsSimpleChat && this.doAnimate && !this.isOrgasm) {
        //animateSpeech(inputChat);
      }

      if (!fIsSimpleChat && inputChat !== "") {
        GlobalModule.doAnimate_CT = false;
        next(args);
        return;
      }

      if (fIsSimpleChat && !this.doAnimate) {
        GlobalModule.doAnimate_CT = true;
        //animateSpeech(inputChat);
      }

      if (this.isOrgasm) {
        GlobalModule.isOrgasm_CT = false;
      }

      next(args);
    },
    ModuleCategory.Global
  );

  ChatRoomRegisterMessageHandler({
    Description: "Sends animation sequence to proccess it on client",
    Priority: 500,
    Callback: (data, sender, msg, metadata) => {
      ChatRoomMessageDisplay(data, msg, sender, metadata);
      return false;
    },
  });
}

/**
 * The list of expressions to animate with their duration.
 */
let animation: [string, number][] | null;
let animationFrame = 0;
function runExpressionAnimationStep() {
  if (Player && animation !== null) {
    // console.log(`running step ${animationFrame}:`, animation[animationFrame]);
    let step = animation[animationFrame++];
    SDK.callOriginal("CharacterSetFacialExpression", [Player, "Mouth", step[0] as ExpressionName]);
    if (animationFrame < animation.length) {
      setTimeout(runExpressionAnimationStep, step[1]);
    } else {
      animation = null;
    }
  }
}

function runExpressionAnimation(c: Character, list: any) {
  if (animation) return; // Animation running, ignore
  animation = list;
  animationFrame = 0;
  if (!Player) return;
  const mouth = InventoryGet(Player, "Mouth");
  if (mouth?.Property?.Expression && animation !== null) {
    // reset the mouth at the end
    animation.push([mouth.Property.Expression, 0]);
  }
  runExpressionAnimationStep();
}

/**
 * Splits a string into chunks of "size" length
 */
function chunkSubstr(str: string, size: number) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
}

/**
 * Gets the about-to-be-sent message, checks it for validity,
 * then splits it in chunks and turns it into a list of expression changes
 * before pushing them into the animator.
 */
export function animateSpeech(c: Character, msg: string) {
  const chunks = chunkSubstr(msg, 3);
  //console.log(`split "${msg}" into ${chunks.length}:`, chunks);

  const animation = chunks.map((chunk) => {
    const match = letterExpressionMap.find(({ regex }) => regex.test(chunk)) ?? { expr: [null, 200] };
    return match.expr;
  });
  //console.log(`animating chunks:`, animation);

  animation.push([null, 0]);
  runExpressionAnimation(c, animation);
}
