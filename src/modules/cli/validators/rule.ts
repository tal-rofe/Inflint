import { IRuleValue } from 'src/shared/interfaces/rule';
import { DEFAULT_ERROR_MESSAGE } from '@/models/error';
import { isRuleEnforcementValid, isRuleArrayValid } from '@/validators/rule';

/**
 * The function returns whether a rule string is valid
 * @param input the string to validate
 * @returns boolean flag indicates the validity of the string
 */
const isRuleValid = (input: string) => {
	let parsedRule: Record<string, unknown>;

	try {
		parsedRule = JSON.parse(input);
	} catch {
		return false;
	}

	if (typeof parsedRule !== 'object') {
		return false;
	}

	const [ruleValue] = Object.values(parsedRule);

	return isRuleEnforcementValid(ruleValue) || (Array.isArray(ruleValue) && isRuleArrayValid(ruleValue));
};

/**
 * The function validates a rule or an array of rules
 * @param input single rule of multiple rules
 * @param errorMessage a message to show in case of invalid input
 * @returns "undefined" if no input provided, transformed rules if all are valid
 * @throws error message in case of invalid rule(s)
 */
export const validateRules = (
	input?: unknown,
	errorMessage?: string,
): Record<string, IRuleValue> | undefined => {
	if (input === undefined) {
		return;
	}

	if (typeof input === 'string' && isRuleValid(input)) {
		return JSON.parse(input);
	}

	if (Array.isArray(input) && input.every((item) => typeof item === 'string' && isRuleValid(item))) {
		return input.reduce<Record<string, IRuleValue>>((final, value) => {
			return {
				...final,
				...JSON.parse(value),
			};
		}, {});
	}

	throw new Error(errorMessage || DEFAULT_ERROR_MESSAGE);
};
