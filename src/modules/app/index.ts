import { IBaseConfiguration } from '@/interfaces/base-configuration';
import { getCLIArgv } from '@/utils/argv';

import StartCLI from '../cli';
import StartConfiguration from '../configuration';
import StartLinting from '../core';
import { recurseSourceConfiguration, mergeConfigurations } from './utils/merge-configurations';

const Bootstrap = async () => {
	const argv = getCLIArgv();

	const configFromCLI = StartCLI(argv);

	if (!configFromCLI) {
		return;
	}

	let lintingConfiguration: IBaseConfiguration;

	if (configFromCLI?.inflintrc === false) {
		lintingConfiguration = configFromCLI;
	} else {
		const sourceResult = await StartConfiguration(configFromCLI?.configFilePath);

		if (sourceResult && sourceResult[1]) {
			const sourceConfiguration = await recurseSourceConfiguration(sourceResult[0], sourceResult[1]);

			lintingConfiguration = mergeConfigurations(configFromCLI, sourceConfiguration);
		} else {
			lintingConfiguration = configFromCLI;
		}
	}

	StartLinting(lintingConfiguration);
};

export default Bootstrap;
