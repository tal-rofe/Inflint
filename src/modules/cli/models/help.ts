import { IOptionsKeys } from '../interfaces/help';

export const options: Record<IOptionsKeys, [string, string]> = {
	inflintrc: [
		'--no-inflintrc',
		'Disable use of configuration from configuration file or package.json. Default: false',
	],
	config: ['-c, --config (path::String)', 'Inflint will use the provided configuration file'],
	rule: ['--rule (String)', 'Specify rules'],
	ruleColonDivider: ['--rule-colon-divider (String)', 'Specify rule divider (default is ":")'],
	ruleCommaDivider: ['--rule-comma-divider (String)', 'Specify rule comma divider (default is ",")'],
	alias: ['--alias (String)', 'Specify custom aliases'],
	aliasColonDivider: ['--alias-colon-divider (String)', 'Specify rule divider (default is ":")'],
	ignorePath: ['--ignore-path (path::String)', 'Specify path of ignore file'],
	ignore: ['--no-ignore', 'Disable use of ignore files and patterns. Default: false'],
	ignorePattern: [
		'--ignore-pattern (String)',
		'Pattern of files to ignore (in addition to those in .inflintignore)',
	],
	quiet: ['--quiet', 'Report errors only. Default: false'],
	maxWarnings: ['--max-warnings (Int)', 'Number of warnings to trigger non-zero exit code. Default: -1'],
	outputFile: ['-o, --output-file (path::String)', 'Specify file to write report to'],
	format: ['-f, --format (String)', 'Use a specific output format. Default: "stylish"'],
	color: ['--color, --no-color', 'Force enabling/disabling of color'],
	init: ['--init', 'Run configuration initialization wizard. Default: false'],
	debug: ['--debug', 'Output debugging information'],
	help: ['-h, --help', 'Show help'],
	version: ['-v, --version', 'Output the version number'],
	printRule: ['--print-rule (path::String)', 'Print the expected rule to be enforced on a given file'],
};
