import { IRuleValue } from '@/interfaces/rule';

import { IConfigurationRuleValue } from '../interfaces/rule';
import { ruleValuePipe } from '../pipes/rule';

/**
 * The function returns whether a configuration rule value
 * @param input the rule value to validate
 * @returns boolean flag indicates the validity of the string
 */
const isRuleValueValid = (input: IConfigurationRuleValue) => {
	if (
		input === 1 ||
		input === 2 ||
		input === 'warn' ||
		input === 'error' ||
		(Array.isArray(input) &&
			(input[0] === 1 || input[0] === 2 || input[0] === 'warn' || input[0] === 'error') &&
			input[1] &&
			typeof input[1] === 'string')
	) {
		return true;
	}

	return false;
};

/**
 * The function validates the configuration rules
 * @param input the rules to validate
 * @returns "undefined" if no input provided, transformed rules if all are valid
 * @throws error message in case of invalid rule(s)
 */
export const validateRules = (input?: Record<string, IConfigurationRuleValue>) => {
	if (input === undefined) {
		return;
	}

	if (typeof input !== 'object') {
		throw new Error('Must provide valid rules');
	}

	if (Object.keys(input).length === 0) {
		return {};
	}

	return Object.keys(input).reduce<Record<string, IRuleValue>>((final, key) => {
		if (typeof key !== 'string') {
			throw new Error(`All rules keys must be valid. Found invalid: ${key}`);
		}

		if (!isRuleValueValid(input[key]!)) {
			throw new Error(`All rules values must be valid. Found invalid: ${key}`);
		}

		return {
			...final,
			[key]: ruleValuePipe(input[key]!),
		};
	}, {});
};
