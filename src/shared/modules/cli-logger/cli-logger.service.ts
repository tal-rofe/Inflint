import path from 'node:path';

import chalk from 'chalk';

import type { IRuleConsoleDetails } from '@/interfaces/rule';

export default abstract class CLILoggerService {
	protected abstract infoImpl(input: string): void;
	protected abstract successImpl(input: string): void;
	protected abstract warnImpl(input: string): void;
	protected abstract errorImpl(input: string): void;
	protected abstract ruleExistenceErrorImpl(details: IRuleConsoleDetails): void;
	protected abstract ruleExistenceWarnImpl(details: IRuleConsoleDetails): void;
	protected abstract ruleAliasErrorImpl(details: IRuleConsoleDetails): void;
	protected abstract ruleAliasWarnImpl(details: IRuleConsoleDetails): void;
	protected abstract lintSummaryImpl(errorsCount: number, warningsCount: number): void;

	public info(input: string) {
		this.infoImpl(input);
	}

	public success(input: string) {
		this.successImpl(input);
	}

	public warn(input: string) {
		this.warnImpl(input);
	}

	public error(input: string) {
		this.errorImpl(input);
	}

	public ruleExistenceError(details: IRuleConsoleDetails) {
		this.default(chalk.underline(path.join(process.cwd(), details.filePath)));
		this.ruleExistenceErrorImpl(details);
		this.emptyBlock();
	}

	public ruleExistenceWarn(details: IRuleConsoleDetails) {
		this.default(chalk.underline(path.join(process.cwd(), details.filePath)));
		this.ruleExistenceWarnImpl(details);
		this.emptyBlock();
	}

	public ruleAliasError(details: IRuleConsoleDetails) {
		this.default(chalk.underline(path.join(process.cwd(), details.filePath)));
		this.ruleAliasErrorImpl(details);
		this.emptyBlock();
	}

	public ruleAliasWarn(details: IRuleConsoleDetails) {
		this.default(chalk.underline(path.join(process.cwd(), details.filePath)));
		this.ruleAliasWarnImpl(details);
		this.emptyBlock();
	}

	public lintSummary(errorsCount: number, warningsCount: number) {
		this.lintSummaryImpl(errorsCount, warningsCount);
	}

	/**
	 * The method prints to the console a default (dry) input
	 * @param input the input to print
	 */
	public default(input: string) {
		// eslint-disable-next-line no-console
		console.log(input);
	}

	/**
	 * The method prints to the console an empty block (2 empty lines)
	 * @returns void
	 */
	public emptyBlock() {
		this.default('');
	}

	/**
	 * The method prints to the console a bold input
	 * @param input the input to print
	 * @returns void
	 */
	public bold(input: string) {
		this.default(chalk.bold(input));
	}

	/**
	 * The method prints to the console a given input with space before and after first text
	 * @param input the input to print
	 * @param before number of spaces before first text
	 * @param after number of spaces after first text
	 */
	public spaced(input: [string, string], before: number, after: number) {
		const beforeString = new Array(before >= 0 ? before : 0).fill(' ').join('');
		const afterString = new Array(after >= 0 ? after : 0).fill(' ').join('');

		this.default(beforeString + input[0] + afterString + input[1]);
	}
}
