import config from '../../config.ts';
import {
	// Discordeno deps
	Bot,
} from '../../deps.ts';
import { ReactionAdd } from '../types/eventTypes.ts';

export const reactionAdd = (bot: Bot, payload: ReactionAdd) => {
	if (config.pollChannels.includes(payload.channelId)) {
		console.log(payload);
	}
};
