import config from '../../config.ts';
// import { dbClient, queries } from '../db.ts';
import {
	Bot,
	// Discordeno deps
	Message,
} from '../../deps.ts';
import { infoColor1 } from '../commandUtils.ts';
import utils from '../utils.ts';

export const version = (bot: Bot, message: Message) => {
	// Light telemetry to see how many times a command is being run
	// dbClient.execute(queries.callIncCnt('version')).catch((e) => utils.commonLoggers.dbError('version.ts:15', 'call sproc INC_CNT on', e));

	bot.helpers.sendMessage(message.channelId, {
		embeds: [{
			color: infoColor1,
			title: `My current version is ${config.version}`,
		}],
	}).catch((e: Error) => utils.commonLoggers.messageSendError('version.ts:24', message, e));
};
