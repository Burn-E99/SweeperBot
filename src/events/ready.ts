import config from '../../config.ts';
import { LOCALMODE } from '../../flags.ts';
import {
	// Discordeno deps
	ActivityTypes,
	Bot,
	editBotMember,
	editBotStatus,
	// Log4Deno deps
	log,
	LT,
	// Discordeno deps
	sendMessage,
} from '../../deps.ts';
import { getRandomSweeperLine, successColor } from '../commandUtils.ts';
import utils from '../utils.ts';

export const ready = (bot: Bot) => {
	log(LT.INFO, `${config.name} Logged in!`);
	editBotStatus(bot, {
		activities: [
			{
				name: 'Booting up . . .',
				type: ActivityTypes.Game,
				createdAt: new Date().getTime(),
			},
		],
		status: 'online',
	});

	// Interval to rotate the status text every 30 seconds to show off more commands
	setInterval(() => {
		log(LT.LOG, 'Changing bot status');
		try {
			// Wrapped in try-catch due to hard crash possible
			editBotStatus(bot, {
				activities: [
					{
						name: getRandomSweeperLine(),
						type: ActivityTypes.Game,
						createdAt: new Date().getTime(),
					},
				],
				status: 'online',
			});
		} catch (e) {
			log(LT.ERROR, `Failed to update status: ${utils.jsonStringifyBig(e)}`);
		}
	}, 30000);

	// setTimeout added to make sure the startup message does not error out
	setTimeout(() => {
		LOCALMODE && editBotMember(bot, config.devServer, { nick: `LOCAL - ${config.name}` });
		editBotStatus(bot, {
			activities: [
				{
					name: 'Booting Complete',
					type: ActivityTypes.Game,
					createdAt: new Date().getTime(),
				},
			],
			status: 'online',
		});
		sendMessage(bot, config.logChannel, {
			embeds: [
				{
					title: `${config.name} is now Online`,
					color: successColor,
					fields: [
						{
							name: 'Version:',
							value: `${config.version}`,
							inline: true,
						},
					],
				},
			],
		}).catch((e: Error) => utils.commonLoggers.messageSendError('mod.ts:88', 'Startup', e));
	}, 1000);
};
