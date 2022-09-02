import config from '../config.ts';
import { DEVMODE, LOCALMODE } from '../flags.ts';
import {
	// Discordeno deps
	ActivityTypes,
	botId,
	editBotNickname,
	editBotStatus,
	EventHandlers,
	// Log4Deno deps
	log,
	LT,
	// Discordeno deps
	sendMessage,
} from '../deps.ts';
// import { dbClient, ignoreList } from './src/db.ts';
import commands from './commands/_index.ts';
import { getRandomSweeperLine, successColor, warnColor } from './commandUtils.ts';
import utils from './utils.ts';

export const events: Partial<EventHandlers> = {};
events.ready = (bot) => {
	log(LT.INFO, `${config.name} Logged in!`);
	editBotStatus(bot, {
		activities: [{
			name: 'Booting up . . .',
			type: ActivityTypes.Game,
			createdAt: new Date().getTime(),
		}],
		status: 'online',
	});

	// Interval to rotate the status text every 30 seconds to show off more commands
	setInterval(async () => {
		log(LT.LOG, 'Changing bot status');
		try {
			// Wrapped in try-catch due to hard crash possible
			editBotStatus(bot, {
				activities: [{
					name: getRandomSweeperLine(),
					type: ActivityTypes.Game,
					createdAt: new Date().getTime(),
				}],
				status: 'online',
			});
		} catch (e) {
			log(LT.ERROR, `Failed to update status: ${utils.jsonStringifyBig(e)}`);
		}
	}, 30000);

	// setTimeout added to make sure the startup message does not error out
	setTimeout(() => {
		LOCALMODE && editBotNickname(bot, config.devServer, { nick: `LOCAL - ${config.name}` });
		editBotStatus(bot, {
			activities: [{
				name: 'Booting Complete',
				type: ActivityTypes.Game,
				createdAt: new Date().getTime(),
			}],
			status: 'online',
		});
		sendMessage(bot, config.logChannel, {
			embeds: [{
				title: `${config.name} is now Online`,
				color: successColor,
				fields: [
					{
						name: 'Version:',
						value: `${config.version}`,
						inline: true,
					},
				],
			}],
		}).catch((e: Error) => utils.commonLoggers.messageSendError('mod.ts:88', 'Startup', e));
	}, 1000);
};

events.guildCreate = (bot, guild) => {
	log(LT.LOG, `Handling joining guild ${utils.jsonStringifyBig(guild)}`);
	sendMessage(bot, config.logChannel, {
		embeds: [{
			title: 'New Guild Joined!',
			color: successColor,
			fields: [
				{
					name: 'Name:',
					value: `${guild.name}`,
					inline: true,
				},
				{
					name: 'Id:',
					value: `${guild.id}`,
					inline: true,
				},
				{
					name: 'Member Count:',
					value: `${guild.memberCount}`,
					inline: true,
				},
			],
		}],
	}).catch((e: Error) => utils.commonLoggers.messageSendError('mod.ts:95', 'Join Guild', e));
};

events.guildDelete = (bot, guildId) => {
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

if (DEVMODE) {
	events.debug = (dmsg) => log(LT.LOG, `Debug Message | ${utils.jsonStringifyBig(dmsg)}`);
}

events.messageCreate = (bot, message) => {
	// Ignore all other bots
	if (message.isFromBot) return;

	// Ignore all messages that are not commands
	if (message.content.indexOf(config.prefix) !== 0) {
		// Handle @bot messages
		if (message.mentionedUserIds[0] === botId && (message.content.trim().startsWith(`<@${botId}>`) || message.content.trim().startsWith(`<@!${botId}>`))) {
			commands.handleMentions(bot, message);
		}

		// return as we are done handling this command
		return;
	}

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
