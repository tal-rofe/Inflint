import { DEFAULT_ERROR_MESSAGE } from '@/models/error';

/**
 * The function validates a boolean input
 * @param input the input to validate
 * @param errorMessage a message to show in case of invalid input
 * @returns "undefined" if no input provided, the input itself if is valid
 * @throws error message in case of invalid input
 */
export const validateBoolean = (input?: unknown, errorMessage?: string) => {
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
export const validateString = (input?: unknown, errorMessage?: string) => {
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
export const validatePositiveInteger = (input?: unknown, errorMessage?: string) => {
	if (input === undefined) {
		return;
	}

	if (typeof input !== 'number' || input < 0 || !Number.isSafeInteger(input)) {
		throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
	}

	return Math.round(input);
};
