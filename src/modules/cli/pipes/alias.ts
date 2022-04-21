import type { IAliasAnswers } from '../interfaces/init';

/**
 * The function converts an array of aliases to an object from answers
 * @param aliasesAnswers the aliases to convert from answers
 * @returns the converted object
 */
export const convertAliasesAnswers = (aliasesAnswers: IAliasAnswers) => {
	return aliasesAnswers.reduce<Record<string, string>>((final, value) => {
		return {
			...final,
			[value.name]: value.regex,
		};
	}, {});
};
