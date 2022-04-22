import { IMappedFunction } from '../interfaces/alias-function';

export const getAliasFunction = (ruleAlias: string, functions: Record<string, IMappedFunction>) => {
	const func = functions[ruleAlias];

	if (!func) {
		const defaultFunc = (input: string) => {
			const regex = new RegExp(ruleAlias);

			return regex.test(input);
		};

		return defaultFunc;
	}

	return func;
};
