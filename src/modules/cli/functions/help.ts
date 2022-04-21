import CLILoggerModule from '@/shared/modules/cli-logger';
import { calcSpaceBias } from '@/utils/cli-logger';

import { options } from '../models/help';

/**
 * The function logs the help document to the console
 * @returns void
 */
export const printHelp = () => {
	const spaceBias = calcSpaceBias(options);

	CLILoggerModule.service.bold('Usage: inflint [options] [files]');
	CLILoggerModule.service.emptyBlock();

	CLILoggerModule.service.default('Inflint is a tool which scans and verifies file name conventions.');
	CLILoggerModule.service.emptyBlock();

	CLILoggerModule.service.bold('Basic configuration:');
	CLILoggerModule.service.spaced(options.inflintrc, 2, spaceBias - options.inflintrc[0].length);
	CLILoggerModule.service.spaced(options.config, 2, spaceBias - options.config[0].length);
	CLILoggerModule.service.emptyBlock();

	CLILoggerModule.service.bold('Specifying rules and aliases:');
	CLILoggerModule.service.spaced(options.rule, 2, spaceBias - options.rule[0].length);
	CLILoggerModule.service.spaced(options.alias, 2, spaceBias - options.alias[0].length);
	CLILoggerModule.service.emptyBlock();

	CLILoggerModule.service.bold('Ignoring files:');
	CLILoggerModule.service.spaced(options.ignorePath, 2, spaceBias - options.ignorePath[0].length);
	CLILoggerModule.service.spaced(options.ignore, 2, spaceBias - options.ignore[0].length);
	CLILoggerModule.service.spaced(options.ignorePattern, 2, spaceBias - options.ignorePattern[0].length);
	CLILoggerModule.service.emptyBlock();

	CLILoggerModule.service.bold('Handling warnings and errors:');
	CLILoggerModule.service.spaced(options.quiet, 2, spaceBias - options.quiet[0].length);
	CLILoggerModule.service.spaced(options.maxWarnings, 2, spaceBias - options.maxWarnings[0].length);
	CLILoggerModule.service.spaced(options.bail, 2, spaceBias - options.bail[0].length);
	CLILoggerModule.service.emptyBlock();

	CLILoggerModule.service.bold('Output:');
	CLILoggerModule.service.spaced(options.outputFile, 2, spaceBias - options.outputFile[0].length);
	CLILoggerModule.service.spaced(options.format, 2, spaceBias - options.format[0].length);
	CLILoggerModule.service.spaced(options.color, 2, spaceBias - options.color[0].length);
	CLILoggerModule.service.emptyBlock();

	CLILoggerModule.service.bold('Miscellaneous:');
	CLILoggerModule.service.spaced(options.init, 2, spaceBias - options.init[0].length);
	CLILoggerModule.service.spaced(options.help, 2, spaceBias - options.help[0].length);
	CLILoggerModule.service.spaced(options.version, 2, spaceBias - options.version[0].length);
	CLILoggerModule.service.spaced(options.printRule, 2, spaceBias - options.printRule[0].length);
	CLILoggerModule.service.emptyBlock();

	CLILoggerModule.service.bold('Inflint documentation:');
	CLILoggerModule.service.default('https://github.com/Vinyl-Depository/Inflint#readme');
};
