import { ITransformedAliases } from '../interfaces/aliases';

/**
 * The function recieves aliases and transforms each value to regex function
 * @param input the aliases to transform
 * @returns the transformed aliases
 */
export const transformAliases = (input: Record<string, string>) => {
	if (Object.keys(input).length === 0) {
		return {};
	}

	return Object.keys(input).reduce<ITransformedAliases>((final, key) => {
		const regex = new RegExp(input[key]!);

		return {
			...final,
			[key]: (input: string) => regex.test(input),
		};
	}, {});
};
