import { IRuleValue } from '@/interfaces/rule';
import { isRuleArrayValid, isRuleEnforcementValid } from '@/validators/rule';

/**
 * The function validates the configuration rules
 * @param input the rules to validate
 * @returns "undefined" if no input provided, transformed rules if all are valid
 * @throws error message in case of invalid rule(s)
 */
export const validateRules = (input?: unknown) => {
	if (input === undefined) {
		return;
	}

	if (!input || typeof input !== 'object') {
		throw new Error('Must provide valid rules');
	}

	if (Object.keys(input).length === 0) {
		return {};
	}

	return Object.keys(input).reduce<Record<string, IRuleValue>>((final, key) => {
		if (typeof key !== 'string') {
			throw new Error(`All rules keys must be valid. Found invalid: ${key}`);
		}

		const ruleValue = (input as Record<string, unknown>)[key];

		const isValidValue =
			isRuleEnforcementValid(ruleValue) || (Array.isArray(ruleValue) && isRuleArrayValid(ruleValue));

		if (!isValidValue) {
			throw new Error(`All rules values must be valid. Found invalid: ${key}`);
		}

		return {
			...final,
			[key]: ruleValue as IRuleValue,
		};
	}, {});
};
