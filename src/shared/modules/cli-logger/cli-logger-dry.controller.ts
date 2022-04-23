import { IRuleConsoleDetails } from '@/interfaces/rule';

import CLILoggerService from './cli-logger.service';

export default class CLILoggerDryController extends CLILoggerService {
	protected infoImpl(input: string) {
		this.default(`🔊 ${input}`);
	}

	protected successImpl(input: string) {
		this.default(`✔️ ${input}`);
	}

	protected warnImpl(input: string) {
		this.default(`✖  ${input}`);
	}

	protected errorImpl(input: string) {
		this.default(`✖  ${input}`);
	}

	protected ruleExistenceErrorImpl(details: IRuleConsoleDetails) {
		const linkString = details.isFolder ? 'folder' : 'file';

		this.default(`  error This ${linkString} is unexpected (Rule key: "${details.key}")`);
	}

	protected ruleExistenceWarnImpl(details: IRuleConsoleDetails) {
		const linkString = details.isFolder ? 'folder' : 'file';

		this.default(`  warning This ${linkString} is unexpected (Rule key: "${details.key}")`);
	}

	protected ruleAliasErrorImpl(details: IRuleConsoleDetails) {
		const linkString = details.isFolder ? 'folder' : 'file';

		this.default(
			`  error Expected ${linkString} name to match "${details.alias}" (Rule key: "${details.key}")`,
		);
	}

	protected ruleAliasWarnImpl(details: IRuleConsoleDetails) {
		const linkString = details.isFolder ? 'folder' : 'file';

		this.default(
			`  warning Expected ${linkString} name to match "${details.alias}" (Rule key: "${details.key}")`,
		);
	}

	protected lintSummaryImpl(errorsCount: number, warningsCount: number) {
		if (errorsCount === 0 && warningsCount === 0) {
			this.default('✔️  Done! (0 errors, 0 warnings)');
		} else if (errorsCount === 0) {
			const problemsString = warningsCount === 1 ? 'problem' : 'problems';
			const warningsString = warningsCount === 1 ? 'warning' : 'warnings';

			this.default(
				`✖  ${warningsCount} ${problemsString} (0 errors, ${warningsCount} ${warningsString})`,
			);
		} else {
			const problemsString = errorsCount === 1 ? 'problem' : 'problems';
			const errorsString = warningsCount === 1 ? 'error' : 'errors';
			const warningsString = warningsCount === 1 ? 'warning' : 'warnings';
			const totalProblems = errorsCount + warningsCount;

			this.default(
				`✖  ${totalProblems} ${problemsString} (${errorsCount} ${errorsString}, ${warningsCount} ${warningsString})`,
			);
		}
	}
}
