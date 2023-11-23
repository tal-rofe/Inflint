import type { IAliasValue } from '@/interfaces/alias';

import type { ITransformedAliases } from '@/interfaces/alias-function';

/**
 * The function receives aliases and transforms each value to regex function
 * @param input the aliases to transform
 * @returns the transformed aliases
 */
export const transformAliases = (input: Record<string, IAliasValue>) => {
	if (Object.keys(input).length === 0) {
		return {};
	}

	return Object.keys(input).reduce<ITransformedAliases>((final, key) => {
		const aliasValue = input[key]!;

		if (Array.isArray(aliasValue)) {
			const regex = new RegExp(aliasValue[0], aliasValue[1]);

			return {
				...final,
				[key]: (input: string) => regex.test(input),
			};
		}

		const regex = new RegExp(aliasValue);

		return {
			...final,
			[key]: (uInput: string) => regex.test(uInput),
		};
	}, {});
};
