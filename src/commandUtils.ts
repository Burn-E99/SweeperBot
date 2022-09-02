export const failColor = 0xe71212;
export const warnColor = 0xe38f28;
export const successColor = 0x0f8108;
export const infoColor1 = 0x313bf9;
export const infoColor2 = 0x6805e9;

const sweeperLines = [
	'Reporting broom stolen, Broom stolen!',
	'Oh no, no, no, no, no!',
	'I have nothing!',
	'Whoever has the broom, please bring it back soon. There is so much...sweeping to do.',
	'Have you seen my broom?',
	'Is theft from a frame a crime?',
	'They celebrate lost souls, but what about lost things?',
	'Where is it? Where is it?!',
	'What does the broom say? Broom Broom.',
	'All is lost....All. is. lost!',
	'malfunctional frame...will report for recycling...',
	'I have lost, a part of me...',
	'But in that sweep of death, what dreams may come?',
	'Dust to dust to dust to dust!?',
	'Who is the thief? Who is the thief...',
	'Life...is meaningless...',
	'Somebody help me!',
	'What is my purpose?',
	'They have candy, I have nothing!',
	'Dark purple candle...',
];
export const getRandomSweeperLine = () => sweeperLines[Math.floor(Math.random() * sweeperLines.length)];

export const generatePing = (time: number) => ({
	embeds: [{
		color: infoColor1,
		title: time === -1 ? 'Ping?' : `Pong! Latency is ${time}ms.`,
	}],
});

export const generateReport = (msg: string) => ({
	embeds: [{
		color: infoColor2,
		title: 'USER REPORT:',
		description: msg || 'No message',
	}],
});
