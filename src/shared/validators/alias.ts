/**
 * The function validates a value of an alias
 * @param input the input to validate
 * @returns a boolean flag indicates the validity of the input
 */
export const isAliasValueValid = (input: unknown) => {
	try {
		if (typeof input === 'string') {
			new RegExp(input);

			return true;
		}

		if (
			Array.isArray(input) &&
			input.length === 2 &&
			typeof input[0] === 'string' &&
			typeof input[1] === 'string'
		) {
			new RegExp(input[0], input[1]);

			return true;
		}
	} catch {}

	return false;
};
