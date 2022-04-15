import minimist from 'minimist';

import { printHelp } from './cli-help';
import { printVersion } from './cli-version';

/**
 * The function stars the CLI phase. If no need to continue to other phase, will return null. Otherwise returns configuration for other phases
 * @param argv the argv from CLI
 * @returns null if need to finish, othewise configuration to work with
 */
export const startCLIPhase = (argv: minimist.ParsedArgs) => {
	if (argv['h'] === true || argv['help'] === true) {
		printHelp();

		return null;
	}

	if (argv['v'] === true || argv['version'] === true) {
		printVersion();

		return null;
	}

	return null;
};
