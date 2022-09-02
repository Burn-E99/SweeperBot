// import { dbClient, queries } from '../db.ts';
import {
	Bot,
	// Discordeno deps
	Message,
	// Discordeno deps
	sendMessage,
} from '../../deps.ts';
import { failColor, successColor } from '../commandUtils.ts';
import utils from '../utils.ts';

export const sendMsg = (bot: Bot, message: Message, args: string[]) => {
	// Light telemetry to see how many times a command is being run
	// dbClient.execute(queries.callIncCnt('report')).catch((e) => utils.commonLoggers.dbError('report.ts:17', 'call sproc INC_CNT on', e));

	try {
		const channelId = BigInt(args.shift() || '0');

		if (args.join(' ') && channelId) {
			sendMessage(bot, channelId, { content: args.join(' ') }).catch((e: Error) => utils.commonLoggers.messageSendError('report.ts:22', message, e));
			bot.helpers.sendMessage(message.channelId, {
				embeds: [{
					color: successColor,
					title: 'Attempted to send.',
				}],
			}).catch((e: Error) => utils.commonLoggers.messageSendError('report.ts:29', message, e));
		}
	} catch (err) {
		bot.helpers.sendMessage(message.channelId, {
			embeds: [{
				color: failColor,
				title: 'Missing args.',
			}],
		}).catch((e: Error) => utils.commonLoggers.messageSendError('report.ts:37', message, e));
	}
};
