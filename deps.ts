// All external dependancies are to be loaded here to make updating dependancy versions much easier
export {
	botId,
	cache,
	cacheHandlers,
	DiscordActivityTypes,
	editBotNickname,
	editBotStatus,
	hasGuildPermissions,
	Intents,
	sendDirectMessage,
	sendMessage,
	startBot,
} from 'https://deno.land/x/discordeno@12.0.1/mod.ts';

export type { CreateMessage, DiscordenoGuild, DiscordenoMessage, EmbedField } from 'https://deno.land/x/discordeno@12.0.1/mod.ts';

export { Client } from 'https://deno.land/x/mysql@v2.10.2/mod.ts';

export { initLog, log, LogTypes as LT } from 'https://raw.githubusercontent.com/Burn-E99/Log4Deno/V1.1.1/mod.ts';
