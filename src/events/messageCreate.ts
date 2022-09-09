import config from '../../config.ts';
import {
	// Discordeno deps
	Bot,
	botId,
	// Log4Deno deps
	log,
	LT,
	// Discordeno deps
	Message,
} from '../../deps.ts';
import commands from '../commands/_index.ts';
import functions from '../functions/_index.ts';
import utils from '../utils.ts';

export const messageCreate = async (bot: Bot, message: Message) => {
	// Ignore all messages that are not commands
	if (message.content.indexOf(config.prefix) !== 0) {
		// Handle @bot messages
		if (message.mentionedUserIds[0] === botId && (message.content.trim().startsWith(`<@${botId}>`) || message.content.trim().startsWith(`<@!${botId}>`))) {
			commands.handleMentions(bot, message);
		}

		if (config.pollChannels.includes(message.channelId)) {
			functions.pollReactions(bot, message);
		}

		if (config.raidCheckpointChannel.includes(message.channelId)) {
			functions.cleanRaidCheckpointChannel(bot, message.channelId);
		}

		// return as we are done handling this command
		return;
	}

	// Ignore all other bots
	if (message.isFromBot) return;

	log(LT.LOG, `Handling ${config.prefix}command message: ${utils.jsonStringifyBig(message)}`);

	// Split into standard command + args format
	const args = message.content.slice(config.prefix.length).trim().split(/[ \n]+/g);
	const command = args.shift()?.toLowerCase();

	// All commands below here
	switch (command) {
		case 'ping':
			// s!ping
			// Its a ping test, what else do you want.
			commands.ping(bot, message);
			break;
		case 'help':
		case 'h':
		case '?':
			// s!help or s!h or s!?
			// Help command, prints from help file
			commands.help(bot, message);
			break;
		case 'info':
		case 'i':
			// s!info or s!i
			// Info command, prints short desc on bot and some links
			commands.info(bot, message);
			break;
		case 'version':
		case 'v':
			// s!version or s!v
			// Returns version of the bot
			commands.version(bot, message);
			break;
		case 'report':
		case 'r':
			// s!report or s!r (command that failed)
			// Manually report a failed roll
			commands.report(bot, message, args);
			break;
		case 'sm':
			// s!sm [channelId]
			// Manually sends a message thru the bot
			if (message.authorId === config.ownerId) {
				commands.sendMessage(bot, message, args);
			}
			break;
		default:
			// Non-standard commands
			console.log(`${command} WIP`);
			break;
	}
};
