import config from '../../config.ts';
// import { dbClient, queries } from '../db.ts';
import {
	Bot,
	// Log4Deno deps
	log,
	LT,
	// Discordeno deps
	Message,
} from '../../deps.ts';
import { getRandomSweeperLine, infoColor1 } from '../commandUtils.ts';
import utils from '../utils.ts';

export const handleMentions = (bot: Bot, message: Message) => {
	log(LT.LOG, `Handling @mention message: ${utils.jsonStringifyBig(message)}`);

	// Light telemetry to see how many times a command is being run
	// dbClient.execute(queries.callIncCnt('mention')).catch((e) => utils.commonLoggers.dbError('handleMentions.ts:17', 'call sproc INC_CNT on', e));

	bot.helpers.sendMessage(message.channelId, {
		embeds: [{
			color: infoColor1,
			title: `Hello!  I am ${config.name}!`,
			description: getRandomSweeperLine(),
		}],
	}).catch((e: Error) => utils.commonLoggers.messageSendError('handleMentions.ts:30', message, e));
};
