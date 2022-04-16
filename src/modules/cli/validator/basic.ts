import { DEFAULT_ERROR_MESSAGE } from '@/models/error';

/**
 * The function validates a boolean input
 * @param input the input to validate
 * @param errorMessage a message to show in case of invalid input
 * @returns "undefined" if no input provided, the input itself if is valid
 * @throws error message in case of invalid input
 */
export const validateBoolean = (input?: boolean, errorMessage?: string) => {
	if (input === undefined) {
		return;
	}

	if (typeof input !== 'boolean') {
		throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
	}

	return input;
};

/**
 * The function validates a string input
 * @param input the input to validate
 * @param errorMessage a message to show in case of invalid input
 * @returns "undefined" if no input provided, the input itself if is valid
 * @throws error message in case of invalid input
 */
export const validateString = (input?: string, errorMessage?: string) => {
	if (input === undefined) {
		return;
	}

	if (typeof input !== 'string') {
		throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
	}

	return input;
};

/**
 * The function validates a positive integer input
 * @param input the input to validate
 * @param errorMessage a message to show in case of invalid input
 * @returns "undefined" if no input provided, the input itself if is valid
 * @throws error message in case of invalid input
 */
export const validateInteger = (input?: string, errorMessage?: string) => {
	if (input === undefined) {
		return;
	}

	if (typeof input !== 'number' || input < 0 || !Number.isSafeInteger(input)) {
		throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
	}

	return Math.round(input);
};

/**
 * The function validates a string or an array of strings
 * @param input the input to validate
 * @param errorMessage a message to show in case of invalid input
 * @returns "undefined" if no input provided, the input itself if is valid
 * @throws error message in case of invalid input
 */
export const validateSringsArray = (input?: string | ReadonlyArray<string>, errorMessage?: string) => {
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
