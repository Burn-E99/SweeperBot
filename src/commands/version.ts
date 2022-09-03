import config from '../../config.ts';
import {
	// Discordeno deps
	Bot,
	Message,
} from '../../deps.ts';
import { infoColor1 } from '../commandUtils.ts';
import utils from '../utils.ts';

export const version = (bot: Bot, message: Message) => {
	bot.helpers.sendMessage(message.channelId, {
		embeds: [{
			color: infoColor1,
			title: `My current version is ${config.version}`,
		}],
	}).catch((e: Error) => utils.commonLoggers.messageSendError('version.ts:24', message, e));
};
