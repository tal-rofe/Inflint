import { ParsedArgs } from 'minimist';

import CLILoggerService from '@/services/cli-logger';

import { printHelp } from './functions/help';
import { printVersion } from './functions/version';
import { initConfiguration } from './functions/init';
import { getConfiguration } from './utils/cli-configuration';

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

	if (argv['init'] === true) {
		initConfiguration();

		return null;
	}

	try {
		const configuration = getConfiguration(argv);

		return configuration;
	} catch (e) {
		CLILoggerService.logDefault(`An error occured: ${(e as Error).message}`);

		process.exit(1);
	}
};

export default StartCLI;
