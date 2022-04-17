import type { ParsedArgs } from 'minimist';

import { withCleanObject } from '@/utils/object';
import { validateBoolean, validateString, validateInteger } from '@/validators/basic';
import { validateSringsArrayOrString } from '@/validators/complex';
import { validateFormat } from '@/validators/format';

import type { ICLIConfiguration } from '../interfaces/cli-configuration';
import { validateRules } from '../validators/rule';
import { validateAliases } from '../validators/alias';

export const getConfiguration = (argv: ParsedArgs) => {
	const configuration = withCleanObject<ICLIConfiguration>({
		inflintrc: validateBoolean(argv['inflintrc'], 'Must provide boolean value to "--no-inflintrc"'),
		configFilePath: validateString(
			argv['c'] || argv['config'],
			'Must provide string value to "-c, --config"',
		),
		rules: validateRules(
			argv['rule'],
			'Must provide valid syntax to "--rule"',
			validateString(argv['rule-colon-divider'], 'Must provide string value to "--rule-colon-divider"'),
			validateString(argv['rule-comma-divider'], 'Must provide string value to "--rule-comma-divider"'),
		),
		aliases: validateAliases(
			argv['alias'],
			'Must provide valid syntax to "--alias"',
			validateString(
				argv['alias-colon-divider'],
				'Must provide string value to "--alias-colon-divider"',
			),
		),
		ignoreFilePath: validateString(argv['ignore-path'], 'Must provide string value to "--ignore-path"'),
		ignore: validateBoolean(argv['ignore'], 'Must provide boolean value to "--no-ignore"'),
		ignorePatterns: validateSringsArrayOrString(
			argv['ignore-pattern'],
			'Must provide string value to "--ignore-pattern"',
		),
		quiet: validateBoolean(argv['quiet'], 'Must provide boolean value to "--quiet"'),
		maxWarnings: validateInteger(
			argv['max-warnings'],
			'Must provide >= 0 safe integer value to "--max-warnings"',
		),
		outputFilePath: validateString(
			argv['o'] || argv['output-file'],
			'Must provide string value to "-o, --output-file"',
		),
		format: validateFormat(argv['f'] || argv['format'], 'Must provide valid format to "-f, --format"'),
		color: validateBoolean(argv['color'], 'Must provide boolean value to "--color"'),
		debug: validateBoolean(argv['debug'], 'Must provide boolean value to "--debug"'),
		printRuleFilePath: validateString(argv['print-rule'], 'Must provide string value to "--print-rule"'),
	});

	return configuration;
};
