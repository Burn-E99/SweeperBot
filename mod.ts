/* The Artificer was built in memory of Babka
 * With love, Ean
 *
 * December 21, 2020
 */

import config from './config.ts';
import { DEBUG, LOCALMODE } from './flags.ts';
import {
	// Discordeno deps
	createBot,
	initLog,
	Intents,
	startBot,
} from './deps.ts';
// import { dbClient, ignoreList } from './src/db.ts';
import { events } from './src/events.ts';

// Initialize logging client with folder to use for logs, needs --allow-write set on Deno startup
initLog('logs', DEBUG);

// Start up the Discord Bot
const bot = createBot({
	token: LOCALMODE ? config.localtoken : config.token,
	intents: Intents.MessageContent | Intents.GuildMessages | Intents.DirectMessages | Intents.Guilds,
	events,
});

startBot(bot);
