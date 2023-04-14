import type { IRuleValue } from '@/interfaces/rule';

export const checkExistenceError = (ruleValue: IRuleValue) => {
	return (
		ruleValue === 'error' ||
		(Array.isArray(ruleValue) && ruleValue[0] === 'error') ||
		ruleValue === 2 ||
		(Array.isArray(ruleValue) &&
			(ruleValue[0] === 'error' || ruleValue[0] === 2) &&
			typeof ruleValue[1] !== 'string')
	);
};

export const checkExistenceWarning = (ruleValue: IRuleValue) => {
	return (
		ruleValue === 'warn' ||
		(Array.isArray(ruleValue) && ruleValue[0] === 'warn') ||
		ruleValue === 1 ||
		(Array.isArray(ruleValue) &&
			(ruleValue[0] === 'warn' || ruleValue[0] === 1) &&
			typeof ruleValue[1] !== 'string')
	);
};

export const checkAliasError = (ruleValue: IRuleValue) => {
	return Array.isArray(ruleValue) && (ruleValue[0] === 'error' || ruleValue[0] === 2);
};

export const checkAliasWarning = (ruleValue: IRuleValue) => {
	return Array.isArray(ruleValue) && (ruleValue[0] === 'warn' || ruleValue[0] === 1);
};
