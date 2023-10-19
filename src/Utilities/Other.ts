export function GetCharacter(memberNumber?: number) {
	return ChatRoomCharacter.find(c => c.MemberNumber == memberNumber) ?? undefined;
}

export function GetRandomInt(max: number) {
	return Math.floor(Math.random() * max);
}