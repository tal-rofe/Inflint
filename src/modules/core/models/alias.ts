import {
	validateCamelCase,
	validateKebabCase,
	validateLowerCase,
	validatePascalCase,
	validatePointCase,
	validateScreamingSnakeCase,
	validateSnakeCase,
} from '../validators/alias';

export const DEFAULT_ALIASES = {
	'lowercase': validateLowerCase,
	'camelCase': validateCamelCase,
	'PascalCase': validatePascalCase,
	'snake_case': validateSnakeCase,
	'SCREAMING_SNAKE_CASE': validateScreamingSnakeCase,
	'kebab-case': validateKebabCase,
	'point.case': validatePointCase,
};
