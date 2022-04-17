import { DEFAULT_ERROR_MESSAGE } from '../models/error';

/**
 * The function validates a string or an array of strings
 * @param input the input to validate
 * @param errorMessage a message to show in case of invalid input
 * @returns "undefined" if no input provided, the input itself if is valid
 * @throws error message in case of invalid input
 */
export const validateSringsArrayOrString = (
	input?: string | ReadonlyArray<string>,
	errorMessage?: string,
) => {
	if (input === undefined) {
		return;
	}

	if (typeof input === 'string') {
		return [input];
	}

	if (
		typeof input === 'string' ||
		(Array.isArray(input) && input.every((item) => typeof item === 'string'))
	) {
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
export const validateSringsArray = (input?: ReadonlyArray<string>, errorMessage?: string) => {
	if (input === undefined) {
		return;
	}

	if (
		typeof input === 'string' ||
		(Array.isArray(input) && input.every((item) => typeof item === 'string'))
	) {
		return input;
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
export const validateStringsObject = (input?: Record<string, string>, errorMessage?: string) => {
	if (input === undefined) {
		return;
	}

	if (Object.keys(input).length === 0) {
		return input;
	}

	for (const key of Object.keys(input)) {
		if (typeof key !== 'string' || !input[key] || typeof input[key] !== 'string') {
			throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
		}
	}

	return input;
};
