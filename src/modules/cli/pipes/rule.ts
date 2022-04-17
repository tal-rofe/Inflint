import { IRuleValue } from '@/interfaces/rule';

/**
 * The function pipes a given rule
 * @param input the rule to pipe
 * @returns the piped rule
 */
export const rulePipe = (
	input: string,
	colonDivider: string,
	commaDivider: string,
): Record<string, IRuleValue> => {
	const splittedInput = input.replace(/\s/g, '').split(colonDivider);
	const filenames = splittedInput[0]!;
	const rule = splittedInput[1]!;

	if (rule.toLowerCase() === 'warn' || rule === '1' || rule.toLowerCase() === '[warn]') {
		return {
			[filenames]: 1,
		};
	}

	if (rule.toLowerCase() === 'error' || rule === '2' || rule.toLowerCase() === '[error]') {
		return {
			[filenames]: 2,
		};
	}

	const firstCommaIndex = rule.indexOf(commaDivider);
	const lastParenthesesIndex = rule.lastIndexOf(']');

	if (rule.indexOf('1') === 1 || rule.indexOf('warn') === 1) {
		return {
			[filenames]: [1, rule.substring(firstCommaIndex + 1, lastParenthesesIndex)],
		};
	}

	return {
		[filenames]: [2, rule.substring(firstCommaIndex + 1, lastParenthesesIndex)],
	};
};
