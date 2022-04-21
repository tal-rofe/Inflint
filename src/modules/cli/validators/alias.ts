import { IAliasValue } from '@/interfaces/alias';
import { DEFAULT_ERROR_MESSAGE } from '@/models/error';
import { isAliasValueValid } from '@/validators/alias';

/**
 * The function returns whether an alias string is valid
 * @param input the string to validate
 * @returns boolean flag indicates the validity of the string
 */
const isAliasValid = (input: string) => {
	let parsedAlias: Record<string, unknown>;

	try {
		parsedAlias = JSON.parse(input);
	} catch {
		return false;
	}

	if (typeof parsedAlias !== 'object') {
		return false;
	}

	const [aliasValue] = Object.values(parsedAlias);

	return isAliasValueValid(aliasValue);
};

/**
 * The function validates an alias or an array of aliases
 * @param input single alias of multiple aliases
 * @param errorMessage a message to show in case of invalid input
 * @returns "undefined" if no input provided, transformed aliases if all are valid
 * @throws error message in case of invalid alias(es)
 */
export const validateAliases = (
	input?: unknown,
	errorMessage?: string,
): Record<string, IAliasValue> | undefined => {
	if (input === undefined) {
		return;
	}

	if (typeof input === 'string' && isAliasValid(input)) {
		return JSON.parse(input);
	}

	if (Array.isArray(input) && input.every((item) => typeof item === 'string' && isAliasValid(item))) {
		return input.reduce<Record<string, IAliasValue>>((final, value) => {
			return {
				...final,
				...JSON.parse(value),
			};
		}, {});
	}

	throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
};
