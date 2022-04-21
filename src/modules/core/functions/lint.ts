/* eslint-disable max-lines */

import path from 'path';

import fg from 'fast-glob';

import { IBaseConfiguration } from '@/interfaces/configuration';
import CLILoggerModule from '@/shared/modules/cli-logger';
import { IRuleConsoleDetails } from '@/interfaces/rule';

import { IMappedFunction } from '../interfaces/aliases';
import { getRuleOptions } from '../utils/rule-options';
import { getRuleAlias } from '../utils/rule-alias';
import { getAliasFunction } from '../utils/alias-function';

export const lint = async (
	configuration: IBaseConfiguration,
	aliasesFunctions: Record<string, IMappedFunction>,
) => {
	const rules = configuration.rules;

	if (!rules) {
		CLILoggerModule.service.success('Done!');

		process.exit(0);
	}

	const errors: IRuleConsoleDetails[] = [];
	const warnings: IRuleConsoleDetails[] = [];

	const rulesKeys = Object.keys(rules);

	for (const ruleKey of rulesKeys) {
		const ruleValue = rules[ruleKey]!;
		const ruleOptions = getRuleOptions(ruleValue);
		const ignorePatterns = configuration.ignorePatterns ?? [];

		const matchingFiles = await fg([ruleKey], {
			...ruleOptions,
			ignore: ignorePatterns,
			markDirectories: true,
		});

		if (matchingFiles.length === 0) {
			continue;
		}

		const ruleAlias = getRuleAlias(ruleValue);
		const ruleAliasFunction = getAliasFunction(ruleAlias, aliasesFunctions);

		const isExistenceError = ruleValue === 'error' || ruleValue === ['error'] || ruleValue === 2;
		const isExistenceWarning = ruleValue === 'warn' || ruleValue === ['warn'] || ruleValue === 1;
		const isAliasError = Array.isArray(ruleValue) && (ruleValue[0] === 'error' || ruleValue[0] === 2);
		const isAliasWarning = Array.isArray(ruleValue) && (ruleValue[0] === 'warn' || ruleValue[0] === 1);

		if (isExistenceError) {
			for (const matchingFile of matchingFiles) {
				const details = {
					filePath: matchingFile,
					key: ruleKey,
				};

				CLILoggerModule.service.ruleExistenceError(details);

				errors.push(details);

				if (errors.length === configuration.bail) {
					CLILoggerModule.service.lintSummary(errors.length, warnings.length);

					process.exit(1);
				}
			}
		} else if (configuration.quiet !== true && isExistenceWarning) {
			for (const matchingFile of matchingFiles) {
				const details = {
					filePath: matchingFile,
					key: ruleKey,
				};

				CLILoggerModule.service.ruleExistenceWarn(details);

				warnings.push(details);

				if (errors.length === configuration.maxWarnings) {
					CLILoggerModule.service.lintSummary(errors.length, warnings.length);

					process.exit(1);
				}
			}
		} else if (isAliasError) {
			for (const matchingFile of matchingFiles) {
				const filename = path.basename(matchingFile);
				const isFolder = filename[filename.length - 1] === '/';

				const validationInput = isFolder
					? filename.substring(0, filename.length - 1)
					: filename.split('.').slice(0, -1).join('.');

				const isValid = ruleAliasFunction(validationInput);

				if (isValid) {
					continue;
				}

				const details = {
					filePath: matchingFile,
					key: ruleKey,
					alias: ruleAlias,
				};

				CLILoggerModule.service.ruleAliasError(details);

				errors.push(details);

				if (errors.length === configuration.bail) {
					CLILoggerModule.service.lintSummary(errors.length, warnings.length);

					process.exit(1);
				}
			}
		} else if (configuration.quiet !== true && isAliasWarning) {
			for (const matchingFile of matchingFiles) {
				const isValid = ruleAliasFunction(matchingFile);

				if (isValid) {
					continue;
				}

				const details = {
					filePath: matchingFile,
					key: ruleKey,
					alias: ruleAlias,
				};

				CLILoggerModule.service.ruleAliasWarn(details);

				warnings.push(details);

				if (errors.length === configuration.maxWarnings) {
					CLILoggerModule.service.lintSummary(errors.length, warnings.length);

					process.exit(1);
				}
			}
		}
	}

	CLILoggerModule.service.lintSummary(errors.length, warnings.length);
};
