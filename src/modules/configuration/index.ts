import { cosmiconfig } from 'cosmiconfig';

import CLILoggerService from '@/services/cli-logger';

import { CONFIGURATION_MODULE_NAME } from './models/configuration';
import { DEFAULT_SEARCH_PLACES } from './models/cosmiconfig';
import { validateConfiguration } from './validators/configuration';

const StartConfiguration = async (configFilePath?: string) => {
	const explorer = cosmiconfig(CONFIGURATION_MODULE_NAME, {
		searchPlaces: configFilePath ? [configFilePath] : DEFAULT_SEARCH_PLACES,
	});

	try {
		const result = await explorer.search().catch(() => null);

		if (configFilePath && result === null) {
			CLILoggerService.logDefault(`Error: Could not find given configuration file: ${configFilePath}`);

			process.exit(1);
		}

		const configurationFromFile =
			result?.config && typeof result?.config === 'object' ? validateConfiguration(result.config) : {};

		return configurationFromFile;
	} catch {
		return null;
	}
};

export default StartConfiguration;
