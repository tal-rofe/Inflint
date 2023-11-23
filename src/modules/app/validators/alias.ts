import {
	validateCamelCaseBase,
	validatePascalCaseBase,
	validateSnakeAndKebabAndPointCase,
} from './alias-base';

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
	return validateCamelCaseBase(input, false);
};

/**
 * The function validates a given input is in "camelCase" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validateCamelCasePoint = (input: string) => {
	return validateCamelCaseBase(input, true);
};

/**
 * The function validates a given input is in "PascalCase" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validatePascalCase = (input: string) => {
	return validatePascalCaseBase(input, false);
};

/**
 * The function validates a given input is in "PascalCase.Point" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validatePascalCasePoint = (input: string) => {
	return validatePascalCaseBase(input, true);
};

/**
 * The function validates a given input is in "snake_case" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validateSnakeCase = (input: string) => {
	return validateSnakeAndKebabAndPointCase(input, '_', false, false);
};

/**
 * The function validates a given input is in "snake_case.point" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validateSnakeCasePoint = (input: string) => {
	return validateSnakeAndKebabAndPointCase(input, '_', false, true);
};

/**
 * The function validates a given input is in "SCREAMING_SNAKE_CASE" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validateScreamingSnakeCase = (input: string) => {
	return validateSnakeAndKebabAndPointCase(input, '_', true, false);
};

/**
 * The function validates a given input is in "SCREAMING_SNAKE_CASE.POINT" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validateScreamingSnakeCasePoint = (input: string) => {
	return validateSnakeAndKebabAndPointCase(input, '_', true, true);
};

/**
 * The function validates a given input is in "kebab-case" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validateKebabCase = (input: string) => {
	return validateSnakeAndKebabAndPointCase(input, '-', false, false);
};

/**
 * The function validates a given input is in "kebab-case.point" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validateKebabCasePoint = (input: string) => {
	return validateSnakeAndKebabAndPointCase(input, '-', false, true);
};

/**
 * The function validates a given input is in "point-case" format
 * @param input the input to validate
 * @returns a boolean flag indicates whether the input is valid
 */
export const validatePointCase = (input: string) => {
	return validateSnakeAndKebabAndPointCase(input, '.', false, false);
};
