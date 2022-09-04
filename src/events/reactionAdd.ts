import config from '../../config.ts';
import {
	// Discordeno deps
	Bot,
} from '../../deps.ts';
import { ReactionAdd } from '../types/eventTypes.ts';
import utils from '../utils.ts';
import functions from '../functions/_index.ts';

export const reactionAdd = async (bot: Bot, payload: ReactionAdd) => {
	if (config.pollChannels.includes(payload.channelId)) {
		try {
			const message = await bot.helpers.getMessage(payload.channelId, payload.messageId);
			const onlyOneWordRX = /(only one)/g
			if (message.content.toLowerCase().includes('clan poll') && message.content.toLowerCase().match(onlyOneWordRX)?.length) {
				functions.onlyOneReaction(bot, message);

				// bot.helpers.getReactions()
			}
		} catch (e) {
			utils.commonLoggers.messageGetError('reactionAdd.ts:14', `failed to get message ${payload.channelId}-${payload.messageId}`, e);
		}
	}
};
