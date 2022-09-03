import config from '../../config.ts';
import {
	// Discordeno deps
	Bot,
	Message,
} from '../../deps.ts';
import { infoColor2 } from '../commandUtils.ts';
import utils from '../utils.ts';

export const info = (bot: Bot, message: Message) => {
	bot.helpers.sendMessage(message.channelId, {
		embeds: [{
			color: infoColor2,
			title: `${config.name}, a Utility bot for the Destiny 2 Clan, -Midnight Coup-`,
			description: `${config.name} is developed by Ean AKA Burn_E99.
Want to check out my source code?  Check it out [here](https://github.com/Burn-E99/SweeperBot).`,
		}],
	}).catch((e: Error) => utils.commonLoggers.messageSendError('info.ts:23', message, e));
};
