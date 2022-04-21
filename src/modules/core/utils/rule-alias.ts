import { IRuleValue } from '@/interfaces/rule';

/**
 * The function returns the rule alias, empty string if there is no one
 * @param ruleValue the rule value
 * @returns the options
 */
export const getRuleAlias = (ruleValue: IRuleValue) => {
	if (!Array.isArray(ruleValue)) {
		return '';
	}

	if (ruleValue.length === 3) {
		return ruleValue[1];
	}

	if (ruleValue.length === 2 && typeof ruleValue[1] === 'string') {
		return ruleValue[1];
	}

	return '';
};
