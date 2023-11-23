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
export const validateSnakeAndKebabAndPointCase = (
	input: string,
	separator: string,
	isScreaming: boolean,
	withPoint: boolean,
) => {
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

		if (
			!isValidAlphabeticChar &&
			!validateNumericChar(value) &&
			value !== separator &&
			(withPoint !== true || value !== '.')
		) {
			return false;
		}

		if (index === inputArray.length - 1) {
			return isValidAlphabeticChar || validateNumericChar(value);
		}

		const nextChar = inputArray[index + 1]!;

		const isValidAlphabeticNextChar =
			validateNumericChar(nextChar) ||
			(!isScreaming && validateLowerCaseChar(nextChar)) ||
			(isScreaming && validateUpperCaseChar(nextChar));

		if ((value === separator || (withPoint === true && value === '.')) && !isValidAlphabeticNextChar) {
			return false;
		}
	}

	return true;
};

/**
 * The function validates a given input is in "camelCase" format
 * @param input the input to validate
 * @param withPoint whether to validate with point convention
 * @returns a boolean flag indicates whether the input is valid
 */
export const validateCamelCaseBase = (input: string, withPoint: boolean) => {
	const inputArray = input.split('');

	if (!validateLowerCaseChar(inputArray.shift()!)) {
		return false;
	}

	for (const [index, value] of inputArray.entries()) {
		if (!validateGenericChar(value) && (!withPoint || (withPoint && value !== '.'))) {
			return false;
		}

		if (index === inputArray.length - 1 && value !== '.') {
			return true;
		}

		const nextChar = inputArray[index + 1]!;

		if (
			(validateUpperCaseChar(value) && !validateLowerCaseChar(nextChar)) ||
			(withPoint && value === '.' && !validateLowerCaseChar(nextChar))
		) {
			return false;
		}
	}

	return true;
};

/**
 * The function validates a given input is in "PascalCase" format
 * @param input the input to validate
 * @param withPoint whether to validate with point convention
 * @returns a boolean flag indicates whether the input is valid
 */
export const validatePascalCaseBase = (input: string, withPoint: boolean) => {
	const inputArray = input.split('');

	if (!validateUpperCaseChar(inputArray.shift()!)) {
		return false;
	}

	return validateCamelCaseBase(inputArray.join(''), withPoint);
};
