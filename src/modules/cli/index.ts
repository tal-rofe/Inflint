import { ParsedArgs } from 'minimist';

import { printHelp } from './functions/help';
import { printVersion } from './functions/version';
import { initConfiguration } from './functions/init';

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

	return null;
};

export default StartCLI;
