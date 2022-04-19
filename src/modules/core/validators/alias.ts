import {
	validateLowerCaseChar,
	validateUpperCaseChar,
	validateGenericChar,
	validateNumericChar,
} from './char';

/**
 * The function validates a given input is in "snake_case" or "SCREAMING_SNAKE_CASE" or "kebab-case" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
const validateSnakeAndKebebAndPointCase = (input: string, separator: string, isScreaming?: boolean) => {
	const inputArray = input.split('');
	const firstChar = inputArray.shift()!;

	if (
		(!isScreaming && !validateLowerCaseChar(firstChar)) ||
		(isScreaming && !validateUpperCaseChar(firstChar))
	) {
		return false;
	}

	for (const [index, value] of inputArray.entries()) {
		const isValidAlphabeticChar =
			(!isScreaming && validateLowerCaseChar(value)) || (isScreaming && validateUpperCaseChar(value));

		if (!isValidAlphabeticChar || !validateNumericChar(value) || value !== separator) {
			return false;
		}

		if (index === inputArray.length - 1) {
			return isValidAlphabeticChar || validateNumericChar(value);
		}

		const nextChar = inputArray[index + 1]!;

		const isValidAlphabeticNextChar =
			(!isScreaming && validateLowerCaseChar(nextChar)) ||
			(isScreaming && validateUpperCaseChar(nextChar));

		if (value === '_' && !isValidAlphabeticNextChar) {
			return false;
		}
	}

	return true;
};

/**
 * The function validates a given input is in "lowercase" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validateLowerCase = (input: string) => input === input.toLowerCase();

/**
 * The function validates a given input is in "camelCase" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validateCamelCase = (input: string) => {
	const inputArray = input.split('');

	if (!validateLowerCaseChar(inputArray.shift()!)) {
		return false;
	}

	for (const [index, value] of inputArray.entries()) {
		if (!validateGenericChar(inputArray[index]!)) {
			return false;
		}

		if (index === inputArray.length - 1) {
			return true;
		}

		const nextChar = inputArray[index + 1]!;

		if (validateUpperCaseChar(value) && !validateLowerCaseChar(nextChar)) {
			return false;
		}
	}

	return true;
};

/**
 * The function validates a given input is in "PascalCase" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validatePascalCase = (input: string) => {
	const inputArray = input.split('');

	if (!validateUpperCaseChar(inputArray.shift()!)) {
		return false;
	}

	return validateCamelCase(inputArray.join(''));
};

/**
 * The function validates a given input is in "snake_case" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validateSnakeCase = (input: string) => {
	return validateSnakeAndKebebAndPointCase(input, '_', false);
};

/**
 * The function validates a given input is in "SCREAMING_SNAKE_CASE" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validateScreamingSnakeCase = (input: string) => {
	return validateSnakeAndKebebAndPointCase(input, '_', true);
};

/**
 * The function validates a given input is in "kebab-case" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validateKebabCase = (input: string) => {
	return validateSnakeAndKebebAndPointCase(input, '-');
};

/**
 * The function validates a given input is in "point-case" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validatePointCase = (input: string) => {
	return validateSnakeAndKebebAndPointCase(input, '.');
};
