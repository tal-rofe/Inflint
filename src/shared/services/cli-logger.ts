/* eslint-disable no-console */

export default class CLILoggerService {
	/**
	 * The method prints to the console an empty block (2 empty lines)
	 * @returns vod
	 */
	public static logEmptyBlock() {
		console.log('\n');
	}

	/**
	 * The method prints to the console a given input
	 * @param input the input to print
	 * @returns void
	 */
	public static logDefault(input: string) {
		console.log(input);
	}

	/**
	 * The method prints to the console a given input with space before and after first text
	 * @param input the input to print
	 * @param before number of spaces before first text
	 * @param after number of spaces after first text
	 */
	public static logSpaced(input: [string, string], before: number, after: number) {
		const beforeString = new Array(before >= 0 ? before : 0).fill(' ').join('');
		const afterString = new Array(after >= 0 ? after : 0).fill(' ').join('');

		console.log(beforeString + input[0] + afterString + input[1]);
	}
}
