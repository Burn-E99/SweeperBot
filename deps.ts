// All external dependancies are to be loaded here to make updating dependancy versions much easier
import { getBotIdFromToken } from 'https://deno.land/x/discordeno@15.0.1/mod.ts'; // https://deno.land/x/discordeno@14.0.1/mod.ts
import config from './config.ts';
import { LOCALMODE } from './flags.ts';
export const botId = getBotIdFromToken(LOCALMODE ? config.localtoken : config.token);

export { ActivityTypes, createBot, editBotMember, editBotStatus, getReactions, Intents, sendMessage, startBot } from 'https://deno.land/x/discordeno@15.0.1/mod.ts';

export type { Bot, CreateMessage, Emoji, EventHandlers, Guild, Member, Message, User } from 'https://deno.land/x/discordeno@15.0.1/mod.ts';

export { Client } from 'https://deno.land/x/mysql@v2.10.2/mod.ts';

export { initLog, log, LogTypes as LT } from 'https://raw.githubusercontent.com/Burn-E99/Log4Deno/V1.1.1/mod.ts';
