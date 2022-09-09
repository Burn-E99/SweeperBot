import { Bot } from "../../deps.ts";
import utils from "../utils.ts";

export const cleanRaidCheckpointChannel = async (bot: Bot, channelId: bigint) => {
	try {
		// Get messages in channel, sort them oldest=>newest, and filter to messages from followed servers
		const messages = (await bot.helpers.getMessages(channelId)).array().sort((a, b) => a.timestamp - b.timestamp).filter(msg => msg.isFromBot && msg.messageReference);

		// Remove most recent message from array
		messages.pop();

		// Delete all other messages
		for (const message of messages) {
			bot.helpers.deleteMessage(message.channelId, message.id, 'Old Checkpoint Message').catch(e => utils.commonLoggers.messageDeleteError('cleanRaidCheckpointChannel.ts:14', message, e));
		}
	} catch (e) {
		utils.commonLoggers.messageGetError('cleanRaidCheckpointChannel.ts:17', 'Something broke', e)
	}
};
