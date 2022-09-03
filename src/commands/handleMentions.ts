import config from '../../config.ts';
import {
	// Discordeno deps
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

	bot.helpers.sendMessage(message.channelId, {
		embeds: [{
			color: infoColor1,
			title: `Hello!  I am ${config.name}!`,
			description: getRandomSweeperLine(),
		}],
	}).catch((e: Error) => utils.commonLoggers.messageSendError('handleMentions.ts:30', message, e));
};
