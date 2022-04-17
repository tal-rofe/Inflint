import { DEFAULT_ERROR_MESSAGE } from '@/models/error';

import { aliasPipe } from '../pipes/alias';

/**
 * The function returns whether an alias string is valid
 * @param input the string to validate
 * @returns boolean flag indicates the validity of the string
 */
const isAliasValid = (input: string, colonDivider: string) => {
	const escapedDivider = colonDivider.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	const regexString = `^.{1,}${escapedDivider}.*([^\s]{1,}).*$`;
	const regex = new RegExp(regexString, 'i');

	return regex.test(input);
};

/**
 * The function validates an alias or an array of aliases
 * @param input single alias of multiple aliases
 * @param errorMessage a message to show in case of invalid input
 * @returns "undefined" if no input provided, transformed aliases if all are valid
 * @throws error message in case of invalid alias(es)
 */
export const validateAliases = (
	input?: string | ReadonlyArray<string>,
	errorMessage?: string,
	colonDivider?: string,
) => {
	if (input === undefined) {
		return;
	}

	if (typeof input === 'string' && isAliasValid(input, colonDivider ?? ':')) {
		return aliasPipe(input, colonDivider ?? ':');
	}

	if (
		Array.isArray(input) &&
		input.every((item) => typeof item === 'string' && isAliasValid(item, colonDivider ?? ':'))
	) {
		return (input as ReadonlyArray<string>).reduce<Record<string, string>>((final, value) => {
			return {
				...final,
				...aliasPipe(value, colonDivider ?? ':'),
			};
		}, {});
	}

	throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
};
