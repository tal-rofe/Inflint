import { IBaseConfiguration } from '@/interfaces/configuration';

import { mergeAliases } from './utils/merge-aliases';

const StartLinting = (configuration: IBaseConfiguration) => {
	const aliases = mergeAliases(configuration.aliases);

	console.log(aliases);
	console.log(configuration);
};

export default StartLinting;
