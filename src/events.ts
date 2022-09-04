import { DEVMODE } from '../flags.ts';
import {
	// Discordeno deps
	EventHandlers,
} from '../deps.ts';
import eventHandlers from './events/_index.ts';

export const events: Partial<EventHandlers> = {};

events.ready = eventHandlers.ready;
events.guildCreate = eventHandlers.guildCreate;
events.guildDelete = eventHandlers.guildDelete;
events.messageCreate = eventHandlers.messageCreate;
events.messageUpdate = eventHandlers.messageUpdate;
events.reactionAdd = eventHandlers.reactionAdd;

if (DEVMODE) {
	events.debug = eventHandlers.debug;
}
