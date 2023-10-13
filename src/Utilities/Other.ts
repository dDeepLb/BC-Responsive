export function GetCharacter(memberNumber?: number) {
	return ChatRoomCharacter.find(c => c.MemberNumber == memberNumber) ?? undefined;
}