import path from 'path';

import { cosmiconfig } from 'cosmiconfig';
import { CosmiconfigResult } from 'cosmiconfig/dist/types';

import { ISourceConfiguration } from 'src/shared/interfaces/configuration';
import CLILoggerService from '@/services/cli-logger';

import { CONFIGURATION_MODULE_NAME } from './models/configuration';
import { DEFAULT_SEARCH_PLACES } from './models/cosmiconfig';
import { validateConfiguration } from './validators/configuration';

const StartConfiguration = async (
	configFilePath?: string,
): Promise<[ISourceConfiguration, string | undefined] | null> => {
	const explorer = cosmiconfig(CONFIGURATION_MODULE_NAME, {
		searchPlaces: configFilePath ? [configFilePath] : DEFAULT_SEARCH_PLACES,
	});

	let result: CosmiconfigResult | null;

	if (configFilePath) {
		const configAbsolutePath = path.join(process.cwd(), configFilePath);

		result = await explorer.load(configAbsolutePath).catch(() => null);
	} else {
		result = await explorer.search().catch(() => null);
	}

	if (configFilePath && result === null) {
		CLILoggerService.logDefault(`Error: Could not find given configuration file: ${configFilePath}`);

		process.exit(1);
	}

	const configurationFromFile =
		result?.config && typeof result?.config === 'object' ? validateConfiguration(result.config) : {};

	return [configurationFromFile, result?.filepath];
};

export default StartConfiguration;
