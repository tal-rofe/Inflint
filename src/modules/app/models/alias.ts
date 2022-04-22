import {
	validateCamelCase,
	validateCamelCasePoint,
	validateKebabCase,
	validateKebabCasePoint,
	validateLowerCase,
	validatePascalCase,
	validatePascalCasePoint,
	validatePointCase,
	validateScreamingSnakeCase,
	validateScreamingSnakeCasePoint,
	validateSnakeCase,
	validateSnakeCasePoint,
} from '../validators/alias';

export const DEFAULT_ALIASES = {
	'lowercase': validateLowerCase,
	'camelCase': validateCamelCase,
	'camelCase.point': validateCamelCasePoint,
	'PascalCase': validatePascalCase,
	'PascalCase.point': validatePascalCasePoint,
	'snake_case': validateSnakeCase,
	'snake_case.point': validateSnakeCasePoint,
	'SCREAMING_SNAKE_CASE': validateScreamingSnakeCase,
	'SCREAMING_SNAKE_CASE.point': validateScreamingSnakeCasePoint,
	'kebab-case': validateKebabCase,
	'kebab-case.point': validateKebabCasePoint,
	'point.case': validatePointCase,
};
