import path from 'path';

import micromatch from 'micromatch';

import { IBaseConfiguration } from '@/interfaces/configuration';
import { IRuleConsoleDetails } from '@/interfaces/rule';
import { outputFile } from '@/functions/output-file';
import CLILoggerModule from '@/shared/modules/cli-logger';
import { validateSringsArray } from '@/validators/complex';
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

import { isDirectory } from '../utils/is-file';

export const lintFiles = async (
	files: unknown[],
	configuration: IBaseConfiguration,
	aliasesFunctions: Record<string, IMappedFunction>,
) => {
	try {
		validateSringsArray(files);
	} catch {
		CLILoggerModule.service.error('Invalid files');

		return 1;
	}

	const rules = configuration.rules;

	if (!rules) {
		CLILoggerModule.service.lintSummary(0, 0);

		if (configuration.outputFilePath) {
			await outputFile(configuration.outputFilePath, [], []);
		}

		return 0;
	}

	const errors: IRuleConsoleDetails[] = [];
	const warnings: IRuleConsoleDetails[] = [];

	const ignorePatterns = configuration.ignorePatterns;

	for (const file of files as string[]) {
		const fileAbsolutePath = path.join(process.cwd(), file);

		if (ignorePatterns && ignorePatterns.length !== 0) {
			const isMatchedByIgnore = micromatch.isMatch(file, ignorePatterns);

			if (isMatchedByIgnore) {
				continue;
			}
		}

		const rulesKeys = Object.keys(rules);

		for (const ruleKey of rulesKeys) {
			const isPathDirectory = await isDirectory(fileAbsolutePath);
			const ruleValue = rules[ruleKey]!;
			const ruleOptions = getRuleOptions(ruleValue);

			if (
				(isPathDirectory && ruleOptions.onlyFiles === true) ||
				(!isPathDirectory && ruleOptions.onlyDirectories === true)
			) {
				break;
			}

			const isMatchedByRuleKey = micromatch.isMatch(file, ruleKey, {
				nocase: ruleOptions.caseSensitiveMatch === false,
				dot: ruleOptions.dot ?? true,
			});

			if (!isMatchedByRuleKey) {
				break;
			}

			const isExistenceError = checkExistenceError(ruleValue);
			const isExistenceWarning = checkExistenceWarning(ruleValue);
			const isAliasError = checkAliasError(ruleValue);
			const isAliasWarning = checkAliasWarning(ruleValue);

			if (isExistenceError) {
				const details = {
					filePath: fileAbsolutePath,
					key: ruleKey,
					isFolder: isPathDirectory,
				};

				CLILoggerModule.service.ruleExistenceError(details);

				errors.push(details);

				if (errors.length === configuration.bail) {
					CLILoggerModule.service.lintSummary(errors.length, warnings.length);

					if (configuration.outputFilePath) {
						await outputFile(configuration.outputFilePath, errors, warnings);
					}

					return 1;
				}
			} else if (configuration.quiet !== true && isExistenceWarning) {
				const details = {
					filePath: fileAbsolutePath,
					key: ruleKey,
					isFolder: isPathDirectory,
				};

				CLILoggerModule.service.ruleExistenceWarn(details);

				warnings.push(details);

				if (warnings.length === configuration.maxWarnings) {
					CLILoggerModule.service.lintSummary(errors.length, warnings.length);

					if (configuration.outputFilePath) {
						await outputFile(configuration.outputFilePath, errors, warnings);
					}

					return 1;
				}
			} else if (isAliasError) {
				const ruleAlias = getRuleAlias(ruleValue);
				const ruleAliasFunction = getAliasFunction(ruleAlias, aliasesFunctions);

				let validationInput: string;

				if (isPathDirectory) {
					validationInput = path.parse(file).base;
				} else {
					validationInput = path.parse(file).name;
				}

				const isValid = ruleAliasFunction(validationInput);

				if (isValid) {
					continue;
				}

				const details = {
					filePath: fileAbsolutePath,
					key: ruleKey,
					isFolder: isPathDirectory,
					alias: ruleAlias,
				};

				CLILoggerModule.service.ruleAliasError(details);

				errors.push(details);

				if (errors.length === configuration.bail) {
					CLILoggerModule.service.lintSummary(errors.length, warnings.length);

					if (configuration.outputFilePath) {
						await outputFile(configuration.outputFilePath, errors, warnings);
					}

					return 1;
				}
			} else if (configuration.quiet !== true && isAliasWarning) {
				const ruleAlias = getRuleAlias(ruleValue);
				const ruleAliasFunction = getAliasFunction(ruleAlias, aliasesFunctions);

				let validationInput: string;

				if (isPathDirectory) {
					validationInput = path.parse(file).base;
				} else {
					validationInput = path.parse(file).name;
				}

				const isValid = ruleAliasFunction(validationInput);

				if (isValid) {
					continue;
				}

				const details = {
					filePath: fileAbsolutePath,
					key: ruleKey,
					isFolder: isPathDirectory,
					alias: ruleAlias,
				};

				CLILoggerModule.service.ruleAliasWarn(details);

				warnings.push(details);

				if (warnings.length === configuration.maxWarnings) {
					CLILoggerModule.service.lintSummary(errors.length, warnings.length);

					if (configuration.outputFilePath) {
						await outputFile(configuration.outputFilePath, errors, warnings);
					}

					return 1;
				}
			}
		}
	}

	CLILoggerModule.service.lintSummary(errors.length, warnings.length);

	if (configuration.outputFilePath) {
		await outputFile(configuration.outputFilePath, errors, warnings);
	}

	return 0;
};
