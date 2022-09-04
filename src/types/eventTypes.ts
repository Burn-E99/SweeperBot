import { Emoji, Member, User } from '../../deps.ts';

export type ReactionAdd = {
	userId: bigint;
	channelId: bigint;
	messageId: bigint;
	guildId?: bigint;
	member?: Member;
	user?: User;
	emoji: Emoji;
};
