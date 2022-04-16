import CLILoggerService from '@/services/cli-logger';
import { calcSpaceBias } from '@/utils/cli-logger';

import { options } from '../models/help';

/**
 * The function logs the help document to the console
 * @returns void
 */
export const printHelp = () => {
	const spaceBias = calcSpaceBias(options);

	CLILoggerService.logDefault('inflint [options] [files]');
	CLILoggerService.logEmptyBlock();

	CLILoggerService.logDefault('Basic configuration:');
	CLILoggerService.logSpaced(options.inflintrc, 2, spaceBias - options.inflintrc[0].length);
	CLILoggerService.logSpaced(options.config, 2, spaceBias - options.config[0].length);
	CLILoggerService.logEmptyBlock();

	CLILoggerService.logDefault('Specifying rules and aliases:');
	CLILoggerService.logSpaced(options.rule, 2, spaceBias - options.rule[0].length);
	CLILoggerService.logSpaced(options.ruleColonDivider, 2, spaceBias - options.ruleColonDivider[0].length);
	CLILoggerService.logSpaced(options.ruleCommaDivider, 2, spaceBias - options.ruleCommaDivider[0].length);
	CLILoggerService.logSpaced(options.alias, 2, spaceBias - options.alias[0].length);
	CLILoggerService.logSpaced(options.aliasColonDivider, 2, spaceBias - options.aliasColonDivider[0].length);
	CLILoggerService.logEmptyBlock();

	CLILoggerService.logDefault('Ignoring files:');
	CLILoggerService.logSpaced(options.ignorePath, 2, spaceBias - options.ignorePath[0].length);
	CLILoggerService.logSpaced(options.ignore, 2, spaceBias - options.ignore[0].length);
	CLILoggerService.logSpaced(options.ignorePattern, 2, spaceBias - options.ignorePattern[0].length);
	CLILoggerService.logEmptyBlock();

	CLILoggerService.logDefault('Handling warnings:');
	CLILoggerService.logSpaced(options.quiet, 2, spaceBias - options.quiet[0].length);
	CLILoggerService.logSpaced(options.maxWarnings, 2, spaceBias - options.maxWarnings[0].length);
	CLILoggerService.logEmptyBlock();

	CLILoggerService.logDefault('Output:');
	CLILoggerService.logSpaced(options.outputFile, 2, spaceBias - options.outputFile[0].length);
	CLILoggerService.logSpaced(options.format, 2, spaceBias - options.format[0].length);
	CLILoggerService.logSpaced(options.color, 2, spaceBias - options.color[0].length);
	CLILoggerService.logEmptyBlock();

	CLILoggerService.logDefault('Miscellaneous:');
	CLILoggerService.logSpaced(options.init, 2, spaceBias - options.init[0].length);
	CLILoggerService.logSpaced(options.debug, 2, spaceBias - options.debug[0].length);
	CLILoggerService.logSpaced(options.help, 2, spaceBias - options.help[0].length);
	CLILoggerService.logSpaced(options.version, 2, spaceBias - options.version[0].length);
	CLILoggerService.logSpaced(options.printRule, 2, spaceBias - options.printRule[0].length);
};
