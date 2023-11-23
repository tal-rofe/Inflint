import type { ParsedArgs } from 'minimist';

import type { ICLIConfiguration } from '@/interfaces/configuration';
import { withCleanObject } from '@/utils/object';
import { validateBoolean, validateString, validatePositiveInteger } from '@/validators/basic';
import { validateStringsArrayOrString } from '@/validators/complex';
import { validateBail } from '@/validators/bail';

import { validateRules } from '../validators/rule';
import { validateAliases } from '../validators/alias';

export const getConfiguration = (argv: ParsedArgs) => {
	const configuration = withCleanObject<ICLIConfiguration>({
		inflintrc: validateBoolean(argv['inflintrc'], 'Must provide boolean value to "--no-inflintrc"'),
		configFilePath: validateString(
			argv['c'] || argv['config'],
			'Must provide string value to "-c, --config"',
		),
		rules: validateRules(argv['rule'], 'Must provide valid JSON syntax to "--rule"'),
		aliases: validateAliases(argv['alias'], 'Must provide valid JSON syntax to "--alias"'),
		ignorePath: validateString(argv['ignore-path'], 'Must provide string value to "--ignore-path"'),
		ignore: validateBoolean(argv['ignore'], 'Must provide boolean value to "--no-ignore"'),
		ignorePatterns: validateStringsArrayOrString(
			argv['ignore-pattern'],
			'Must provide string value to "--ignore-pattern"',
		),
		quiet: validateBoolean(argv['quiet'], 'Must provide boolean value to "--quiet"'),
		maxWarnings: validatePositiveInteger(
			argv['max-warnings'],
			'Must provide >= 0 safe integer value to "--max-warnings"',
		),
		bail: validateBail(argv['bail'], 'Must provide >=0 safe integer or boolean value to "--bail"'),
		outputFile: validateString(
			argv['o'] || argv['output-file'],
			'Must provide string value to "-o, --output-file"',
		),
		color: validateBoolean(argv['color'], 'Must provide boolean value to "--color"'),
	});

	return configuration;
};
