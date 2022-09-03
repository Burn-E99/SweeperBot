import config from '../../config.ts';
import {
	// Discordeno deps
	Bot,
	// Log4Deno deps
	log,
	LT,
	// Discordeno deps
	sendMessage,
} from '../../deps.ts';
import { warnColor } from '../commandUtils.ts';
import utils from '../utils.ts';

export const guildDelete = (bot: Bot, guildId: bigint) => {
	log(LT.LOG, `Handling leaving guild ${utils.jsonStringifyBig(guildId)}`);
	sendMessage(bot, config.logChannel, {
		embeds: [{
			title: 'Removed from Guild',
			color: warnColor,
			fields: [
				{
					name: 'Id:',
					value: `${guildId}`,
					inline: true,
				},
			],
		}],
	}).catch((e: Error) => utils.commonLoggers.messageSendError('mod.ts:99', 'Leave Guild', e));
};
