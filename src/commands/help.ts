import config from '../../config.ts';
import {
	// Discordeno deps
	Bot,
	Message,
} from '../../deps.ts';
import { infoColor2 } from '../commandUtils.ts';
import utils from '../utils.ts';

export const help = (bot: Bot, message: Message) => {
	bot.helpers.sendMessage(message.channelId, {
		embeds: [{
			color: infoColor2,
			title: `${config.name}\'s Available Commands:`,
			fields: [
				{
					name: `\`${config.prefix}?\``,
					value: 'This command',
					inline: true,
				},
				{
					name: `\`${config.prefix}ping\``,
					value: 'Pings the bot to check connectivity',
					inline: true,
				},
				{
					name: `\`${config.prefix}info\``,
					value: 'Prints some information and links relating to the bot',
					inline: true,
				},
				{
					name: `\`${config.prefix}version\``,
					value: 'Prints the bots version',
					inline: true,
				},
				{
					name: `\`${config.prefix}report [text]\``,
					value: 'Report a command that failed to run',
					inline: true,
				},
			],
		}],
	}).catch((e: Error) => utils.commonLoggers.messageSendError('help.ts:82', message, e));
};
