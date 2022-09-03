import config from '../../config.ts';
import {
	// Discordeno deps
	Bot,
	// Discordeno deps
	Message,
} from '../../deps.ts';
import functions from '../functions/_index.ts';

export const messageUpdate = (bot: Bot, message: Message) => {
	// Ignore all other bots
	if (message.isFromBot) return;

	// Ignore all messages that are not commands
	if (message.content.indexOf(config.prefix) !== 0) {
		if (config.pollChannels.includes(message.channelId)) {
			functions.pollReactions(bot, message, true);
		}
	}
};
