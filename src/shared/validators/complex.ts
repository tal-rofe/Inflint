import { DEFAULT_ERROR_MESSAGE } from '../models/error';

/**
 * The function validates a string or an array of strings
 * @param input the input to validate
 * @param errorMessage a message to show in case of invalid input
 * @returns "undefined" if no input provided, the input itself if is valid
 * @throws error message in case of invalid input
 */
export const validateSringsArrayOrString = (input?: unknown, errorMessage?: string): string[] | undefined => {
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

	if (Array.isArray(input) && input.every((item) => item && typeof item === 'string')) {
		return input as string[];
	}

	throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
};
