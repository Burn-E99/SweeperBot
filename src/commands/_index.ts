import { ping } from './ping.ts';
import { help } from './help.ts';
import { info } from './info.ts';
import { version } from './version.ts';
import { report } from './report.ts';
import { handleMentions } from './handleMentions.ts';
import { sendMsg } from './sendMessage.ts';

export default {
	ping,
	help,
	info,
	version,
	report,
	handleMentions,
	sendMessage: sendMsg,
};
