import { DEFAULT_ERROR_MESSAGE } from '../models/error';

/**
 * The function validates a string or an array of strings
 * @param input the input to validate
 * @param errorMessage a message to show in case of invalid input
 * @returns "undefined" if no input provided, the input itself if is valid
 * @throws error message in case of invalid input
 */
export const validateSringsArrayOrString = (
	input?: unknown,
	errorMessage?: string,
): ReadonlyArray<string> | undefined => {
	if (input === undefined) {
		return;
	}

	if (typeof input === 'string') {
		return [input];
	}

	if (Array.isArray(input) && input.every((item) => typeof item === 'string')) {
		return input;
	}

	throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
};

/**
 * The function validates an array of strings
 * @param input the input to validate
 * @param errorMessage a message to show in case of invalid input
 * @returns "undefined" if no input provided, the input itself if is valid
 * @throws error message in case of invalid input
 */
export const validateSringsArray = (input?: unknown, errorMessage?: string) => {
	if (input === undefined) {
		return;
	}

	if (Array.isArray(input) && input.every((item) => typeof item === 'string')) {
		return input as ReadonlyArray<string>;
	}

	throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
};

/**
 * The function validates an objects of strings
 * @param input the input to validate
 * @param errorMessage a message to show in case of invalid input
 * @returns "undefined" if no input provided, the input itself if is valid
 * @throws error message in case of invalid input
 */
export const validateStringsObject = (input?: unknown, errorMessage?: string) => {
	if (input === undefined) {
		return;
	}

	if (!input || typeof input !== 'object') {
		throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
	}

	if (Object.keys(input).length === 0) {
		return input as Record<string, string>;
	}

	for (const key of Object.keys(input)) {
		if (
			typeof key !== 'string' ||
			!(input as Record<string, unknown>)[key] ||
			typeof (input as Record<string, unknown>)[key] !== 'string'
		) {
			throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
		}
	}

	return input as Record<string, string>;
};
