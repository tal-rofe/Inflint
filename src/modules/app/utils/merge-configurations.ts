import path from 'path';

import { cosmiconfig } from 'cosmiconfig';

import { IBaseConfiguration, ISourceConfiguration } from 'src/shared/interfaces/configuration';
import { withCleanObject } from '@/utils/object';
import CLILoggerService from '@/services/cli-logger';
import { validateConfiguration } from '@/modules/configuration/validators/configuration';

/**
 * The merges configurations. The first one takes preference over the second
 * @param config1 the first configuration
 * @param config2 the second configuration
 * @returns merged configuration
 */
export const mergeConfigurations = (
	config1: IBaseConfiguration,
	config2: IBaseConfiguration,
): IBaseConfiguration => {
	const mergedRules = {
		...(config2.rules ?? {}),
		...(config1.rules ?? {}),
	};

	const mergredAliases = {
		...(config2.aliases ?? {}),
		...(config1.aliases ?? {}),
	};

	const mergedIgnorePatterns = [...(config2.ignorePatterns ?? []), ...(config1.ignorePatterns ?? [])];

	return withCleanObject({
		...config2,
		...config1,
		rules: Object.keys(mergedRules).length > 0 ? mergedRules : undefined,
		aliases: Object.keys(mergredAliases).length > 0 ? mergredAliases : undefined,
		ignorePatterns: mergedIgnorePatterns.length > 0 ? mergedIgnorePatterns : undefined,
	});
};

/**
 * The function merges configurations with respect to "extends" value
 * @param config the first configuration
 * @param configPath the path to second configuration
 * @returns merged configurations
 */
export const recurseSourceConfiguration = async (
	config: ISourceConfiguration,
	configPath: string,
): Promise<ISourceConfiguration> => {
	if (!config.extends) {
		return config;
	}

	const extendsFilePath = path.join(configPath, '..', config.extends);
	const explorer = cosmiconfig('');
	const result = await explorer.load(extendsFilePath).catch(() => null);

	if (!result) {
		CLILoggerService.logDefault(`Error: Could not find given extends file: ${extendsFilePath}`);

		process.exit(1);
	}

	const configurationFromFile =
		result.config && typeof result.config === 'object' ? validateConfiguration(result.config) : {};

	if (Object.keys(configurationFromFile).length === 0) {
		return {};
	}

	const recursedConfig = await recurseSourceConfiguration(configurationFromFile, result.filepath);

	return mergeConfigurations(config, recursedConfig);
};
