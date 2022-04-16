import StartCLI from './modules/cli';
import StartConfiguration from './modules/configuration';
import StartLinting from './modules/core';
import { getCLIArgv } from './utils/argv';

const argv = getCLIArgv();

const configFromCLI = StartCLI(argv);

console.log(configFromCLI);

if (configFromCLI) {
	const outerConfig = StartConfiguration();

	if (outerConfig) {
		StartLinting();
	}
}
