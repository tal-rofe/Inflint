import { DEFAULT_ERROR_MESSAGE } from '../models/error';
import { Format } from '../models/format';

/**
 * The function validates an input is valid format
 * @param input the input to validate
 * @returns "undefined" if no input provided, the input itself if is valid
 * @throws error message in case of invalid input
 */
export const validateFormat = (input?: unknown, errorMessage?: string) => {
	if (input === undefined) {
		return;
	}

	for (const value of Object.values(Format)) {
		if (value === input) {
			return value;
		}
	}

	throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
};
