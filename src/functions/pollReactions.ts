import {
	// Discordeno deps
	Bot,
	// Discordeno deps
	Message,
} from '../../deps.ts';
import utils from '../utils.ts';

export const pollReactions = async (bot: Bot, message: Message, update = false) => {
	if (message.content.toLowerCase().includes('clan poll')) {
		// Emoji RegExp
		const unicodeEmojis = '(\\p{Emoji_Presentation}|\\p{Extended_Pictographic})';
		const unicodeEmojiRX = `(${unicodeEmojis}(\u200d${unicodeEmojis})*)`;
		const discordEmojiRX = '(:[a-zA-Z\\d_]+:\\d+)';
		const allEmojiRX = new RegExp(`${unicodeEmojiRX}|${discordEmojiRX}`, 'gu');

		// Get list of emojis in message
		const allEmojis = message.content.match(allEmojiRX) || [];

		// If message was edited
		if (update) {
			// Get message to get reactions from it
			const pollMsg = await bot.helpers.getMessage(message.channelId, message.id).catch((e: Error) => utils.commonLoggers.messageGetError('pollReactions.ts:23', message, e));

			// If there are reactions, determine if we need to remove any
			if (pollMsg?.reactions?.length) {
				for (const reaction of pollMsg.reactions) {
					if (reaction.emoji.name) {
						// Make emoji name that matches our allEmojis array format
						const emojiName = reaction.emoji.id ? `:${reaction.emoji.name}:${reaction.emoji.id}` : reaction.emoji.name;
						if (!allEmojis.includes(emojiName)) {
							bot.helpers.deleteReaction(message.channelId, message.id, emojiName).catch((e: Error) => utils.commonLoggers.reactionDeleteError('pollReactions.ts:32', message, e, emojiName));
						}
					}
				}
			}
		}

		// Finally, add all reactions to the message
		bot.helpers.addReactions(message.channelId, message.id, allEmojis, true).catch((e: Error) => utils.commonLoggers.reactionAddError('pollReactions.ts:40', message, e, allEmojis.toString()));
	}
};
