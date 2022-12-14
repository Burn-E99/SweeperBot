import config from '../../config.ts';
import {
	// Discordeno deps
	Bot,
	Message,
	sendMessage,
} from '../../deps.ts';
import { failColor, generateReport, successColor } from '../commandUtils.ts';
import utils from '../utils.ts';

export const report = (bot: Bot, message: Message, args: string[]) => {
	if (args.join(' ')) {
		sendMessage(bot, config.reportChannel, generateReport(args.join(' '))).catch((e: Error) => utils.commonLoggers.messageSendError('report.ts:22', message, e));
		bot.helpers.sendMessage(message.channelId, {
			embeds: [{
				color: successColor,
				title: 'Failed command has been reported to my developer.',
				description: `For more in depth support, ping <@177974415332605953>.`,
			}],
		}).catch((e: Error) => utils.commonLoggers.messageSendError('report.ts:29', message, e));
	} else {
		bot.helpers.sendMessage(message.channelId, {
			embeds: [{
				color: failColor,
				title: 'Please provide a short description of what failed',
				description: 'Providing a short description helps my developer quickly diagnose what went wrong.',
			}],
		}).catch((e: Error) => utils.commonLoggers.messageSendError('report.ts:37', message, e));
	}
};
