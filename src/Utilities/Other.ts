export function getCharacter(memberNumber?: number) {
  return ChatRoomCharacter.find((c) => c.MemberNumber == memberNumber) ?? undefined;
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function injectStyle(styleSrc: string) {
  const checkStyle = document.getElementById("bcr_style");
  if (checkStyle) return;

  const styleElement = document.createElement("style");
  styleElement.id = "bcr_style";
  styleElement.appendChild(document.createTextNode(styleSrc));
  document.head.appendChild(styleElement);
}
