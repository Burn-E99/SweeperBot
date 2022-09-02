// import { dbClient, queries } from '../db.ts';
import {
	Bot,
	// Discordeno deps
	Message,
} from '../../deps.ts';
import { generatePing } from '../commandUtils.ts';
import utils from '../utils.ts';

export const ping = async (bot: Bot, message: Message) => {
	// Light telemetry to see how many times a command is being run
	// dbClient.execute(queries.callIncCnt('ping')).catch((e) => utils.commonLoggers.dbError('ping.ts:14', 'call sproc INC_CNT on', e));

	// Calculates ping between sending a message and editing it, giving a nice round-trip latency.
	try {
		const m = await bot.helpers.sendMessage(message.channelId, generatePing(-1));
		bot.helpers.editMessage(m.channelId, m.id, generatePing(m.timestamp - message.timestamp));
	} catch (e) {
		utils.commonLoggers.messageSendError('ping.ts:23', message, e);
	}
};
