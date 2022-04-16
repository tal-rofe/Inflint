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

/**
 * The function pipes a given alias
 * @param input the alias to pipe
 * @returns the piped alias
 */
export const aliasPipe = (input: string, colonDivider: string): Record<string, string> => {
	const splittedInput = input.replace(/\s/g, '').split(colonDivider);
	const aliasName = splittedInput[0]!;
	const aliasRegex = splittedInput[1]!;

	return {
		[aliasName]: aliasRegex,
	};
};
