import type { ParsedArgs } from 'minimist';

import CLILoggerModule from '@/shared/modules/cli-logger';

import { printHelp } from './functions/help';
import { printVersion } from './functions/version';
import { getConfiguration } from './utils/cli-configuration';
import { printEnvironmentInfo } from './functions/env-info';

/**
 * The function begins the CLI process
 * @param argv the argv to use
 * @returns null if whole process is done, or config object to continue on with
 */
const StartCLI = (argv: ParsedArgs) => {
	if (argv['h'] === true || argv['help'] === true) {
		printHelp();

		return null;
	}

	if (argv['v'] === true || argv['version'] === true) {
		printVersion();

		return null;
	}

	if (argv['env-info'] === true) {
		printEnvironmentInfo();

		return null;
	}

	try {
		const configuration = getConfiguration(argv);

		return configuration;
	} catch (error) {
		CLILoggerModule.service.error((error as Error).message);

		process.exit(1);
	}
};

export default StartCLI;
