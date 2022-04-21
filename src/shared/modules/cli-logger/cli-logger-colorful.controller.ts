import chalk from 'chalk';

import { IRuleConsoleDetails } from '@/interfaces/rule';

import CLILoggerService from './cli-logger.service';

export default class CLILoggerColorfulController extends CLILoggerService {
	protected infoImpl(input: string) {
		this.default(chalk.bold(`🔊 ${input}`));
	}

	protected successImpl(input: string) {
		this.default(chalk.bold.green(`✔️  ${input}`));
	}

	protected warnImpl(input: string) {
		this.default(`${chalk.bold.yellow('✖  Error:')} ${input}`);
	}

	protected errorImpl(input: string) {
		this.default(`${chalk.bold.red('✖  Error:')} ${input}`);
	}

	protected ruleExistenceErrorImpl(details: IRuleConsoleDetails) {
		this.default(`  ${chalk.red('error')} This file/folder is unexpected (Rule key: "${details.key}")`);
	}

	protected ruleExistenceWarnImpl(details: IRuleConsoleDetails) {
		this.default(
			`  ${chalk.yellow('warning')} This file/folder is unexpected (Rule key: "${details.key}")`,
		);
	}

	protected ruleAliasErrorImpl(details: IRuleConsoleDetails) {
		this.default(
			`  ${chalk.red('error')} Expected file name to match "${details.alias}" (Rule key: "${
				details.key
			}")`,
		);
	}

	protected ruleAliasWarnImpl(details: IRuleConsoleDetails) {
		this.default(
			`  ${chalk.yellow('warning')} Expected file name to match "${details.alias}" (Rule key: "${
				details.key
			}")`,
		);
	}

	protected lintSummaryImpl(errorsCount: number, warningsCount: number) {
		if (errorsCount === 0 && warningsCount === 0) {
			this.default(chalk.bold.green('✔️  Done! (0 errors, 0 warnings)'));
		} else if (errorsCount === 0) {
			const problemsString = warningsCount === 1 ? 'problem' : 'problems';
			const warningsString = warningsCount === 1 ? 'warning' : 'warnings';

			this.default(
				chalk.bold.yellow(
					`✖  ${warningsCount} ${problemsString} (0 errors, ${warningsCount} ${warningsString})`,
				),
			);
		} else {
			const problemsString = errorsCount === 1 ? 'problem' : 'problems';
			const errorsString = errorsCount === 1 ? 'error' : 'errors';
			const warningsString = warningsCount === 1 ? 'warning' : 'warnings';
			const totalProblems = errorsCount + warningsCount;

			this.default(
				chalk.bold.red(
					`✖  ${totalProblems} ${problemsString} (${errorsCount} ${errorsString}, ${warningsCount} ${warningsString})`,
				),
			);
		}
	}
}
