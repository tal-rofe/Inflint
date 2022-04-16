import { DEFAULT_ERROR_MESSAGE } from '@/models/error';

import { IRuleValue } from '../interfaces/rule';
import { rulePipe } from '../pipes/rule';

/**
 * The function returns whether a rule string is valid
 * @param input the string to validate
 * @returns boolean flag indicates the validity of the string
 */
const isRuleValid = (input: string, colonDivider: string, commaDivider: string) => {
	const escapedColonDivider = colonDivider.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	const escapedCommaDivider = commaDivider.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	const regexString = `^.*[^\\s]{1,}.*${escapedColonDivider}(\\s)*(1|2|warn|error|\\[(\\s)*(1|2|warn|error)(\\s)*(${escapedCommaDivider}(\\s)*[^\\s]{1,}(\\s)*)?\\])(\\s)*$`;
	const regex = new RegExp(regexString, 'i');

	return regex.test(input);
};

/**
 * The function validates a rule or an array of rules
 * @param input single rule of multiple rules
 * @param errorMessage a message to show in case of invalid input
 * @returns "undefined" if no input provided, transformed rules if all are valid
 * @throws error message in case of invalid rule(s)
 */
export const validateRules = (
	input?: string | ReadonlyArray<string>,
	errorMessage?: string,
	colonDivider?: string,
	commaDivider?: string,
) => {
	if (input === undefined) {
		return;
	}

	if (typeof input === 'string' && isRuleValid(input, colonDivider ?? ':', commaDivider ?? ',')) {
		return rulePipe(input, colonDivider ?? ':', commaDivider ?? ',');
	}

	if (
		Array.isArray(input) &&
		input.every(
			(item) => typeof item === 'string' && isRuleValid(item, colonDivider ?? ':', commaDivider ?? ','),
		)
	) {
		return (input as ReadonlyArray<string>).reduce<Record<string, IRuleValue>>((final, value) => {
			return {
				...final,
				...rulePipe(value, colonDivider ?? ':', commaDivider ?? ','),
			};
		}, {});
	}

	throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
};
