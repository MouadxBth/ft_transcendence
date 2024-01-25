export type BlockStatus = {
	senderId: string;
	senderNickname: string;
	targetId: string;
	targetNickname: string;
	blocking: boolean;
	blockedBy: boolean;
};
