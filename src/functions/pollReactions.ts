import config from '../../config.ts';
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
		const unicodeEmojiRX = `(\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u{200D}\\p{Emoji}(\\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?)+|\\p{EPres}(\\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?|\\p{Emoji}(\\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F}))`;
		const discordEmojiRX = '(a?:[a-zA-Z\\d_]+:\\d+)';

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
						await bot.helpers.deleteReactionsEmoji(message.channelId, message.id, emojiName).catch((e: Error) => utils.commonLoggers.reactionDeleteError('pollReactions.ts:32', message, e, emojiName));
					}
				}
			}
		}

		// Finally, add all reactions to the message
		for (const emoji of allEmojis) {
			await bot.helpers.addReaction(message.channelId, message.id, emoji).catch(async (_err) => {
				try {
					const [animated, emojiName, emojiId] = emoji.split(':');
					const newEmoji = await bot.helpers.createEmoji(config.devServer, { name: emojiName, image: `https://cdn.discordapp.com/emojis/${emojiId}.${animated ? 'gif' : 'webp'}` });
					await bot.helpers.addReaction(message.channelId, message.id, `:${newEmoji.name}:${newEmoji.id}`);
					await bot.helpers.deleteEmoji(config.devServer, newEmoji.id || 0n);
				} catch (e) {
					utils.commonLoggers.reactionAddError('pollReactions.ts:45', message, e, emoji);
				}
			});
		}
	}
};
