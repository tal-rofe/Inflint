import CLILoggerService from '@/services/cli-logger';

type IOptionsKeys =
	| 'noInflintrc'
	| 'config'
	| 'rule'
	| 'ignorePath'
	| 'noIgnore'
	| 'ignorePattern'
	| 'quiet'
	| 'maxWarnings'
	| 'outputFile'
	| 'format'
	| 'color'
	| 'init'
	| 'debug'
	| 'help'
	| 'version'
	| 'printRule';

/**
 * The function logs the help document to the console
 * @returns void
 */
export const printHelp = () => {
	const options: Record<IOptionsKeys, [string, string]> = {
		noInflintrc: [
			'--no-inflintrc',
			'Disable use of configuration from configuration file or package.json. Default: false',
		],
		config: ['-c, --config (path::String)', 'Inflint will use the provided configuration file'],
		rule: ['--rule (String)', 'Specify rules'],
		ignorePath: ['--ignore-path (path::String)', 'Specify path of ignore file'],
		noIgnore: ['-"-no-ignore', 'Disable use of ignore files and patterns. Default: false'],
		ignorePattern: [
			'--ignore-pattern (String)',
			'Pattern of files to ignore (in addition to those in .inflintignore)',
		],
		quiet: ['--quiet', 'Report errors only. Default: false'],
		maxWarnings: [
			'--max-warnings (Int)',
			'Number of warnings to trigger non-zero exit code. Default: -1',
		],
		outputFile: ['-o, --output-file (path::String)', 'Specify file to write report to'],
		format: ['-f, --format (String)', 'Use a specific output format. Default: "stylish"'],
		color: ['--color, --no-color', 'Force enabling/disabling of color'],
		init: ['--init', 'Run configuration initialization wizard. Default: false'],
		debug: ['--debug', 'Output debugging information'],
		help: ['-h, --help', 'Show help'],
		version: ['-v, --version', 'Output the version number'],
		printRule: ['--print-rule (path::String)', 'Print the expected rule to be enforced on a given file'],
	};

	const spaceBias =
		Object.values(options).reduce<number>((final, value) => {
			return Math.max(final, value[0]!.length);
		}, 0) + 3;

	CLILoggerService.logDefault('inflint [options] [files]');

	CLILoggerService.logDefault('Basic configuration:');
	CLILoggerService.logSpaced(options.noInflintrc, 2, spaceBias - options.noInflintrc[0].length);
	CLILoggerService.logSpaced(options.config, 2, spaceBias - options.config[0].length);
	CLILoggerService.logEmptyLine();

	CLILoggerService.logDefault('Specifying rules:');
	CLILoggerService.logSpaced(options.rule, 2, spaceBias - options.rule[0].length);
	CLILoggerService.logEmptyLine();

	CLILoggerService.logDefault('Ignoring files:');
	CLILoggerService.logSpaced(options.ignorePath, 2, spaceBias - options.ignorePath[0].length);
	CLILoggerService.logSpaced(options.noIgnore, 2, spaceBias - options.noIgnore[0].length);
	CLILoggerService.logSpaced(options.ignorePattern, 2, spaceBias - options.ignorePattern[0].length);
	CLILoggerService.logEmptyLine();

	CLILoggerService.logDefault('Handling warnings:');
	CLILoggerService.logSpaced(options.quiet, 2, spaceBias - options.quiet[0].length);
	CLILoggerService.logSpaced(options.maxWarnings, 2, spaceBias - options.maxWarnings[0].length);
	CLILoggerService.logEmptyLine();

	CLILoggerService.logDefault('Output:');
	CLILoggerService.logSpaced(options.outputFile, 2, spaceBias - options.outputFile[0].length);
	CLILoggerService.logSpaced(options.format, 2, spaceBias - options.format[0].length);
	CLILoggerService.logSpaced(options.color, 2, spaceBias - options.color[0].length);
	CLILoggerService.logEmptyLine();

	CLILoggerService.logDefault('Miscellaneous:');
	CLILoggerService.logSpaced(options.init, 2, spaceBias - options.init[0].length);
	CLILoggerService.logSpaced(options.debug, 2, spaceBias - options.debug[0].length);
	CLILoggerService.logSpaced(options.help, 2, spaceBias - options.help[0].length);
	CLILoggerService.logSpaced(options.version, 2, spaceBias - options.version[0].length);
	CLILoggerService.logSpaced(options.printRule, 2, spaceBias - options.printRule[0].length);
};
