import { DEFAULT_ERROR_MESSAGE } from '@/models/error';

import { Format } from '../models/format';

/**
 * The function validates an input is valid format
 * @param input the input to validate
 * @returns "undefined" if no input provided, the input itself if is valid
 * @throws error message in case of invalid input
 */
export const validateFormat = (input?: Format, errorMessage?: string) => {
	if (input === undefined) {
		return;
	}

	if (Object.values(Format).includes(input)) {
		return input;
	}

	throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
};
