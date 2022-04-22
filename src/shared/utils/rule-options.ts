import { IRuleOptions, IRuleValue } from '../interfaces/rule';
import { withCleanObject } from './object';

/**
 * The function returns the rule options, empty object is there are no options
 * @param ruleValue the rule value
 * @returns the options
 */
export const getRuleOptions = (ruleValue: IRuleValue): IRuleOptions => {
	if (!Array.isArray(ruleValue)) {
		return {};
	}

	if (ruleValue.length === 3) {
		return withCleanObject({
			onlyDirectories: ruleValue[2].onlyDirectories,
			onlyFiles: ruleValue[2].onlyFiles,
			dot: ruleValue[2].dot,
			caseSensitiveMatch: ruleValue[2].caseSensitiveMatch,
		});
	}

	if (ruleValue.length === 2 && typeof ruleValue[1] === 'object') {
		return withCleanObject({
			onlyDirectories: ruleValue[1].onlyDirectories,
			onlyFiles: ruleValue[1].onlyFiles,
			dot: ruleValue[1].dot,
			caseSensitiveMatch: ruleValue[1].caseSensitiveMatch,
		});
	}

	return {};
};
