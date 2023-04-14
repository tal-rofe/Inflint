import type { ISourceConfiguration } from '@/interfaces/configuration';
import CLILoggerModule from '@/shared/modules/cli-logger';
import { withCleanObject } from '@/utils/object';
import { validateBoolean, validatePositiveInteger, validateString } from '@/validators/basic';
import { validateSringsArray } from '@/validators/complex';
import { validateBail } from '@/validators/bail';

import { validateRules } from './rule';
import { validateAliases } from './alias';

export const validateConfiguration = (configuration: Record<string, unknown>) => {
	try {
		const finalConfiguration = withCleanObject<ISourceConfiguration>({
			extends: validateString(configuration['extends'], 'Must provide a string value "extends"'),
			rules: validateRules(configuration['rules']),
			aliases: validateAliases(configuration['aliases']),
			ignorePath: validateString(
				configuration['ignorePath'],
				'Must provide a string value to "ignorePath"',
			),
			ignore: validateBoolean(configuration['ignore'], 'Must provide a boolean value to "ignore"'),
			ignorePatterns: validateSringsArray(configuration['ignorePatterns']),
			quiet: validateBoolean(configuration['quiet'], 'Must provide a boolean value to "quiet"'),
			maxWarnings: validatePositiveInteger(
				configuration['maxWarnings'],
				'Must provide a valid number value to "maxWarnings"',
			),
			bail: validateBail(
				configuration['bail'],
				'Must provide >=0 safe integer or boolean value to "--bail"',
			),
			outputFile: validateString(
				configuration['outputFile'],
				'Must provide a string value to "outputFile"',
			),
		});

		return finalConfiguration;
	} catch (error) {
		CLILoggerModule.service.error((error as Error).message);

		process.exit(1);
	}
};
