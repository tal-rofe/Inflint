import { IBaseConfiguration } from '@/interfaces/configuration';

import { lint } from './functions/lint';
import { mergeAliases } from './utils/merge-aliases';

const StartLinting = async (configuration: IBaseConfiguration) => {
	const aliases = mergeAliases(configuration.aliases);

	await lint(configuration, aliases);
};

export default StartLinting;
