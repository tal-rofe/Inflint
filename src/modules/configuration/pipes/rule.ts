import { IRuleValue } from '@/interfaces/rule';
import { IConfigurationRuleValue } from '../interfaces/rule';

/**
 * The function pipes a given rule value
 * @param input the rule value to pipe
 * @returns the piped rule
 */
export const ruleValuePipe = (input: IConfigurationRuleValue): IRuleValue => {
	if (input === 'warn' || input === 1) {
		return 1;
	}

	if (input === 'error' || input === 2) {
		return 2;
	}

	if (input[0] === 'warn' || input[0] === 1) {
		return [1, input[1]];
	}

	return [2, input[1]];
};
