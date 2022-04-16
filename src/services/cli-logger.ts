/* eslint-disable no-console */

export default class CLILoggerService {
	public static logEmptyBlock() {
		console.log('\n');
	}

	public static logDefault(input: string) {
		console.log(input);
	}

	public static logSpaced(input: [string, string], before: number, after: number) {
		const beforeString = new Array(before >= 0 ? before : 0).fill(' ').join('');
		const afterString = new Array(after >= 0 ? after : 0).fill(' ').join('');

		console.log(beforeString + input[0] + afterString + input[1]);
	}
}
