import {
	// Discordeno deps
	Bot,
	Emoji,
	Message,
} from '../../deps.ts';
import { ReactionAdd } from '../types/eventTypes.ts';
import utils from '../utils.ts';

const emojiName = (emoji: Emoji) => {
	const emojiId = emoji.id ? `:${emoji.id}` : '';
	return `${emoji.name}${emojiId}`;
};

export const onlyOneReaction = async (bot: Bot, payload: ReactionAdd, message: Message) => {
	const newEmoji = emojiName(payload.emoji);

	if (message.reactions) {
		for (const reaction of message.reactions) {
			const otherEmoji = emojiName(reaction.emoji);

			if (newEmoji !== otherEmoji) {
				bot.helpers.deleteUserReaction(message.channelId, message.id, payload.userId, otherEmoji).catch((e) =>
					utils.commonLoggers.reactionDeleteError('onlyOneReaction.ts:23', message, e, otherEmoji)
				);
			}
		}
	}
};
