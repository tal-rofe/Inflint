import { IOptionsKeys } from '../interfaces/help';

export const options: Record<IOptionsKeys, [string, string]> = {
	inflintrc: [
		'--no-inflintrc',
		'Disable use of configuration from configuration file or package.json. Default: false',
	],
	config: ['-c, --config (path::String)', 'Inflint will use the provided configuration file'],
	rule: ['--rule (String)', 'Specify rules'],
	alias: ['--alias (String)', 'Specify custom aliases'],
	ignorePath: ['--ignore-path (path::String)', 'Specify path of ignore file'],
	ignore: ['--no-ignore', 'Disable use of ignore files and patterns. Default: false'],
	ignorePattern: [
		'--ignore-pattern (String)',
		'Pattern of files to ignore (in addition to those in .inflintignore)',
	],
	quiet: ['--quiet', 'Report errors only. Default: false'],
	maxWarnings: ['--max-warnings (Int)', 'Number of warnings to trigger non-zero exit code. Default: -1'],
	bail: [
		'--bail (Int/Boolean)',
		'Number of failures (errors) to make Inflint to exit. Setting "bail" to true is the same as setting "1". Default: 0',
	],
	outputFile: ['-o, --output-file (path::String)', 'Specify file to write report to'],
	color: ['--color, --no-color', 'Force enabling/disabling of color'],
	init: ['--init', 'Run configuration initialization wizard. Default: false'],
	help: ['-h, --help', 'Show help'],
	version: ['-v, --version', 'Output the version number'],
	envVersions: ['--env-info', 'Output the environment version'],
};
