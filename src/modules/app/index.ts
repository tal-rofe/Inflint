import { getCLIArgv } from '@/utils/argv';

import StartCLI from '../cli';
import StartConfiguration from '../configuration';
import StartLinting from '../core';

const Bootstrap = () => {
	const argv = getCLIArgv();

	const configFromCLI = StartCLI(argv);

	if (!configFromCLI) {
		return;
	}

	const configFromSource =
		configFromCLI?.inflintrc === false ? null : StartConfiguration(configFromCLI?.configFilePath);

	console.log(configFromSource);

	StartLinting();
};

export default Bootstrap;
