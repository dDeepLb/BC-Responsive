import { charTalkHandle } from "./Utilities/Handlers";

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

/**
 * Initializates everything for Character Talk work
 */
export function initCharTalk() {
  ChatRoomRegisterMessageHandler({
    Description: "Processes mouth moving on the client",
    Priority: 500,
    Callback: (data, sender, msg, metadata) => {
      if (data.Type == "Chat") {
        charTalkHandle(sender, msg);
        return false;
      }
    }
  });
}

/**
 * The list of expressions to animate with their duration.
 */
let animation: { [characterName: number]: [ExpressionName, number][] } = {};
let exprBak: { [characterName: number]: ExpressionName } = {};
let animationFrame = 0;
function runExpressionAnimationStep(c: Character) {
  if (!animation?.[c.MemberNumber]) return;
  let step = animation[c.MemberNumber][animationFrame++];
  setLocalFacialExpressionMouth(c, step?.[0]);
  if (animationFrame < animation?.[c.MemberNumber].length) {
    setTimeout(() => runExpressionAnimationStep(c), step[1]);
  } else {
    delete animation[c.MemberNumber];
    setLocalFacialExpressionMouth(c, exprBak?.[c.MemberNumber]);
  }
}

function runExpressionAnimation(c: Character, list: any) {
  if (animation?.[c.MemberNumber]) return; // Animation running, ignore
  animation[c.MemberNumber] = list;
  animationFrame = 0;
  const mouth = InventoryGet(c, "Mouth");
  if (mouth?.Property?.Expression && animation[c.MemberNumber] !== null) {
    // reset the mouth at the end
    animation?.[c.MemberNumber].push([mouth.Property.Expression, 0]);
    exprBak[c.MemberNumber] = mouth.Property.Expression;
  }
  runExpressionAnimationStep(c);
}

/**
 * Splits a string into chunks of "size" length
 */
function chunkSubstr(str: string, size: number) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substring(o, o + size);
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

  const animation = chunks.map((chunk) => {
    const match = letterExpressionMap.find(({ regex }) => regex.test(chunk)) ?? { expr: [null, 200] };
    return match.expr;
  });

  runExpressionAnimation(c, animation);
}

function setLocalFacialExpressionMouth(c: Character, expression: ExpressionName) {
  const mouth = InventoryGet(c, "Mouth");

  if (expression != null && !mouth.Asset.Group.AllowExpression.includes(expression)) return;

  if (!mouth.Property) mouth.Property = {};

  mouth.Property.Expression = expression;

  CharacterRefresh(c);
}
