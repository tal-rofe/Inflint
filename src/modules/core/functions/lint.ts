import path from 'path';

import fg from 'fast-glob';

import { IBaseConfiguration } from '@/interfaces/configuration';
import CLILoggerModule from '@/shared/modules/cli-logger';
import { IRuleConsoleDetails } from '@/interfaces/rule';
import { getRuleOptions } from '@/utils/rule-options';
import {
	checkAliasError,
	checkAliasWarning,
	checkExistenceError,
	checkExistenceWarning,
} from '@/utils/enforcement-type';
import { getRuleAlias } from '@/utils/rule-alias';
import { IMappedFunction } from '@/interfaces/alias-function';
import { getAliasFunction } from '@/utils/alias-function';
import { outputFile } from '@/functions/output-file';

export const lint = async (
	configuration: IBaseConfiguration,
	aliasesFunctions: Record<string, IMappedFunction>,
) => {
	const rules = configuration.rules;

	if (!rules) {
		CLILoggerModule.service.lintSummary(0, 0);

		if (configuration.outputFile) {
			await outputFile(configuration.outputFile, [], []);
		}

		process.exit(0);
	}

	const errors: IRuleConsoleDetails[] = [];
	const warnings: IRuleConsoleDetails[] = [];
	const ignorePatterns = configuration.ignorePatterns ?? [];
	const rulesKeys = Object.keys(rules);

	for (const ruleKey of rulesKeys) {
		const ruleValue = rules[ruleKey]!;
		const ruleOptions = getRuleOptions(ruleValue);

		const matchingFiles = await fg([ruleKey], {
			onlyFiles: false,
			dot: true,
			...ruleOptions,
			ignore: ignorePatterns,
			markDirectories: true,
		});

		if (matchingFiles.length === 0) {
			continue;
		}

		const isExistenceError = checkExistenceError(ruleValue);
		const isExistenceWarning = checkExistenceWarning(ruleValue);
		const isAliasError = checkAliasError(ruleValue);
		const isAliasWarning = checkAliasWarning(ruleValue);

		if (isExistenceError) {
			for (const matchingFile of matchingFiles) {
				const isFolder = matchingFile[matchingFile.length - 1] === '/';

				const details = {
					filePath: matchingFile,
					key: ruleKey,
					isFolder,
				};

				CLILoggerModule.service.ruleExistenceError(details);

				errors.push(details);

				if (errors.length === configuration.bail) {
					CLILoggerModule.service.lintSummary(errors.length, warnings.length);

					if (configuration.outputFile) {
						await outputFile(configuration.outputFile, errors, warnings);
					}

					process.exit(1);
				}
			}
		} else if (configuration.quiet !== true && isExistenceWarning) {
			for (const matchingFile of matchingFiles) {
				const isFolder = matchingFile[matchingFile.length - 1] === '/';

				const details = {
					filePath: matchingFile,
					key: ruleKey,
					isFolder,
				};

				CLILoggerModule.service.ruleExistenceWarn(details);

				warnings.push(details);

				if (warnings.length === configuration.maxWarnings) {
					CLILoggerModule.service.lintSummary(errors.length, warnings.length);

					if (configuration.outputFile) {
						await outputFile(configuration.outputFile, errors, warnings);
					}

					process.exit(1);
				}
			}
		} else if (isAliasError) {
			const ruleAlias = getRuleAlias(ruleValue);
			const ruleAliasFunction = getAliasFunction(ruleAlias, aliasesFunctions);

			for (const matchingFile of matchingFiles) {
				const isFolder = matchingFile[matchingFile.length - 1] === '/';

				let validationInput: string;

				if (isFolder) {
					validationInput = path.parse(matchingFile).base;
				} else {
					validationInput = path.parse(matchingFile).name;
				}

				const isValid = ruleAliasFunction(validationInput);

				if (isValid) {
					continue;
				}

				const details = {
					filePath: matchingFile,
					key: ruleKey,
					isFolder,
					alias: ruleAlias,
				};

				CLILoggerModule.service.ruleAliasError(details);

				errors.push(details);

				if (errors.length === configuration.bail) {
					CLILoggerModule.service.lintSummary(errors.length, warnings.length);

					if (configuration.outputFile) {
						await outputFile(configuration.outputFile, errors, warnings);
					}

					process.exit(1);
				}
			}
		} else if (configuration.quiet !== true && isAliasWarning) {
			const ruleAlias = getRuleAlias(ruleValue);
			const ruleAliasFunction = getAliasFunction(ruleAlias, aliasesFunctions);

			for (const matchingFile of matchingFiles) {
				const isFolder = matchingFile[matchingFile.length - 1] === '/';

				let validationInput: string;

				if (isFolder) {
					validationInput = path.parse(matchingFile).base;
				} else {
					validationInput = path.parse(matchingFile).name;
				}

				const isValid = ruleAliasFunction(validationInput);

				if (isValid) {
					continue;
				}

				const details = {
					filePath: matchingFile,
					key: ruleKey,
					isFolder,
					alias: ruleAlias,
				};

				CLILoggerModule.service.ruleAliasWarn(details);

				warnings.push(details);

				if (warnings.length === configuration.maxWarnings) {
					CLILoggerModule.service.lintSummary(errors.length, warnings.length);

					if (configuration.outputFile) {
						await outputFile(configuration.outputFile, errors, warnings);
					}

					process.exit(1);
				}
			}
		}
	}

	CLILoggerModule.service.lintSummary(errors.length, warnings.length);

	if (configuration.outputFile) {
		await outputFile(configuration.outputFile, errors, warnings);
	}

	if (errors.length > 0) {
		process.exit(1);
	}
};
