import path from 'path';

import TypeScriptLoader from 'cosmiconfig-typescript-loader';

import { cosmiconfig } from 'cosmiconfig';
import { CosmiconfigResult } from 'cosmiconfig/dist/types';

import { ISourceConfiguration } from '@/interfaces/configuration';
import CLILoggerModule from '@/shared/modules/cli-logger';

import { CONFIGURATION_MODULE_NAME } from './models/configuration';
import { DEFAULT_SEARCH_PLACES } from './models/cosmiconfig';
import { validateConfiguration } from './validators/configuration';

const StartConfiguration = async (
	configFilePath?: string,
): Promise<[ISourceConfiguration, string | undefined] | null> => {
	const explorer = cosmiconfig(CONFIGURATION_MODULE_NAME, {
		searchPlaces: configFilePath ? [configFilePath] : DEFAULT_SEARCH_PLACES,
		loaders: {
			'.ts': TypeScriptLoader(),
		},
	});

	let result: CosmiconfigResult | null;

	if (configFilePath) {
		const configAbsolutePath = path.join(process.cwd(), configFilePath);

		result = await explorer.load(configAbsolutePath).catch(() => null);
	} else {
		result = await explorer.search().catch(() => null);
	}

	if (configFilePath && result === null) {
		CLILoggerModule.service.error(`Could not find given configuration file: '${configFilePath}'`);

		process.exit(1);
	}

	const configurationFromFile =
		result?.config && typeof result?.config === 'object' ? validateConfiguration(result.config) : {};

	return [configurationFromFile, result?.filepath];
};

export default StartConfiguration;
