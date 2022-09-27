export const config = {
	'name': 'Sweeper Bot', // Name of the bot
	'version': '0.4.4', // Version of the bot
	'token': 'the_bot_token', // Discord API Token for this bot
	'localtoken': 'local_testing_token', // Discord API Token for a secondary OPTIONAL testing bot, THIS MUST BE DIFFERENT FROM "token"
	'prefix': 's!', // Prefix for all commands
	'db': { // Settings for the MySQL database, this is required for use with the API, if you do not want to set this up, you will need to rip all code relating to the DB out of the bot
		'host': '', // IP address for the db, usually localhost
		'localhost': '', // IP address for a secondary OPTIONAL local testing DB, usually also is localhost, but depends on your dev environment
		'port': 3306, // Port for the db
		'username': '', // Username for the account that will access your DB, this account will need "DB Manager" admin rights and "REFERENCES" Global Privalages
		'password': '', // Password for the account, user account may need to be authenticated with the "Standard" Authentication Type if this does not work out of the box
		'name': '', // Name of the database Schema to use for the bot
	},
	'logChannel': 0n, // Discord channel ID where the bot should put startup messages and other error messages needed
	'reportChannel': 0n, // Discord channel ID where reports will be sent when using the built-in report command
	'devServer': 0n, // Discord guild ID where testing of indev features/commands will be handled, used in conjuction with the DEVMODE bool in mod.ts
	'ownerId': 0n, // Discord user ID of the bot owner
	'pollChannels': [], // List of Discord channel IDs that are to be managed by the pollReaction system
	'raidCheckpointChannel': [], // List of Discord channel IDs that are to be managed by the cleanRaidCheckpoints system
};

export default config;
