/**
 * The function validate a given input has first char numeric one
 * @param input the input to validates
 * @returns a boolean flag indicates the validity of the input
 */
export const validateNumericChar = (input: string) => {
	const charCode = input.charCodeAt(0);

	return charCode >= 48 && charCode <= 57;
};

/**
 * The function validates a given input has first char lower cased
 * @param input the input to validates
 * @returns a boolean flag indicates the validity of the input
 */
export const validateLowerCaseChar = (input: string) => {
	const charCode = input.charCodeAt(0);

	return charCode >= 97 && charCode <= 122;
};

/**
 * The function validates a given input has first char upper cased
 * @param input the input to validates
 * @returns a boolean flag indicates the validity of the input
 */
export const validateUpperCaseChar = (input: string) => {
	const charCode = input.charCodeAt(0);

	return charCode >= 65 && charCode <= 90;
};

/**
 * The function validate a given input has first char valid
 * @param input the input to validates
 * @returns a boolean flag indicates the validity of the input
 */
export const validateGenericChar = (input: string) =>
	validateLowerCaseChar(input) || validateUpperCaseChar(input) || validateNumericChar(input);
