import type { IMappedFunction } from '../interfaces/alias-function';

export const getAliasFunction = (ruleAlias: string, functions: Record<string, IMappedFunction>) => {
	const function_ = functions[ruleAlias];

	if (!function_) {
		const defaultFunction = (input: string) => {
			const regex = new RegExp(ruleAlias);

			return regex.test(input);
		};

		return defaultFunction;
	}

	return function_;
};
