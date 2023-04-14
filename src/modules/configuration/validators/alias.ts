import type { IAliasValue } from '@/interfaces/alias';
import { isAliasValueValid } from '@/validators/alias';

/**
 * The function validates the configuration aliases
 * @param input the aliases to validate
 * @returns "undefined" if no input provided, transformed aliases if all are valid
 * @throws error message in case of invalid alias(s)
 */
export const validateAliases = (input?: unknown) => {
	if (input === undefined) {
		return;
	}

	if (!input || typeof input !== 'object') {
		throw new Error('Must provide valid aliases');
	}

	if (Object.keys(input).length === 0) {
		return {};
	}

	return Object.keys(input).reduce<Record<string, IAliasValue>>((final, key) => {
		if (typeof key !== 'string') {
			throw new Error(`All aliases keys must be valid. Found invalid: ${key}`);
		}

		if (!key) {
			throw new Error('All aliases keys must be valid. Found empty alias key');
		}

		const aliasValue = (input as Record<string, unknown>)[key];

		const isValidValue = isAliasValueValid(aliasValue);

		if (!isValidValue) {
			throw new Error(`All aliases values must be valid. Found invalid: ${key}`);
		}

		return {
			...final,
			[key]: aliasValue as IAliasValue,
		};
	}, {});
};
