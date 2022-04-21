import { DEFAULT_ERROR_MESSAGE } from '../models/error';

/**
 * The function validates a "bail" value
 * @param input the input to validate
 * @param errorMessage a message to show in case of invalid input
 * @returns "undefined" if no input provided, the transformed input if is valid
 * @throws error message in case of invalid input
 */
export const validateBail = (input?: unknown, errorMessage?: string) => {
	if (input === undefined) {
		return;
	}

	if (input === true) {
		return 1;
	}

	if (input === false) {
		return 0;
	}

	if (typeof input !== 'number' || input < 0 || !Number.isSafeInteger(input)) {
		throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
	}

	return Math.round(input);
};
