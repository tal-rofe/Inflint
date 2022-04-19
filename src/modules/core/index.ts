import { IBaseConfiguration } from '@/interfaces/configuration';

import { mergeAliases } from './utils/merge-aliases';

const StartLinting = (configuration: IBaseConfiguration) => {
	const allRules = mergeAliases(configuration.aliases);

	console.log(allRules);
};

export default StartLinting;
