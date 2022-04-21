import {
	validateCamelCase,
	validateKebabCase,
	validateKebabCasePoint,
	validateLowerCase,
	validatePascalCase,
	validatePointCase,
	validateScreamingSnakeCase,
	validateScreamingSnakeCasePoint,
	validateSnakeCase,
	validateSnakeCasePoint,
} from '../validators/alias';

export const DEFAULT_ALIASES = {
	'lowercase': validateLowerCase,
	'camelCase': validateCamelCase,
	'camelCase.point': validateLowerCase,
	'PascalCase': validatePascalCase,
	'PascalCase.point': validateLowerCase,
	'snake_case': validateSnakeCase,
	'snake_case.point': validateSnakeCasePoint,
	'SCREAMING_SNAKE_CASE': validateScreamingSnakeCase,
	'SCREAMING_SNAKE_CASE.point': validateScreamingSnakeCasePoint,
	'kebab-case': validateKebabCase,
	'kebab-case.point': validateKebabCasePoint,
	'point.case': validatePointCase,
};
