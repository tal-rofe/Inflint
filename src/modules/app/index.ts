import { IBaseConfiguration } from '@/interfaces/configuration';
import CLILoggerModule from '@/shared/modules/cli-logger';
import { getCLIArgv } from '@/utils/argv';

import StartCLI from '../cli';
import StartConfiguration from '../configuration';
import StartLinting from '../core';
import { lintFiles } from './functions/lint-files';
import { mergeAliases } from './utils/merge-aliases';
import { recurseSourceConfiguration, mergeConfigurations } from './utils/merge-configurations';
import { readIgnoreFile } from './utils/read-ignore-file';

const Bootstrap = async () => {
	const argv = getCLIArgv();

	const configFromCLI = StartCLI(argv);

	if (!configFromCLI) {
		return;
	}

	let lintingConfiguration: IBaseConfiguration;

	if (configFromCLI.inflintrc === false) {
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

	if (lintingConfiguration.ignore === false) {
		delete lintingConfiguration['ignorePatterns'];
	} else {
		const ignorePatternsFromFile = await readIgnoreFile(lintingConfiguration.ignorePath);

		lintingConfiguration = mergeConfigurations(lintingConfiguration, {
			ignorePatterns: ignorePatternsFromFile,
		});
	}

	const argvFiles = argv['_'];

	const aliases = mergeAliases(lintingConfiguration.aliases);

	if (argvFiles.length !== 0) {
		const exitCode = await lintFiles(argvFiles, lintingConfiguration, aliases);

		process.exit(exitCode);
	}

	CLILoggerModule.service.default('$ inflint\n');

	await StartLinting(lintingConfiguration, aliases);
};

export default Bootstrap;
