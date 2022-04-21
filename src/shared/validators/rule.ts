/**
 * The function validates rule options object
 * @param input the input to validate
 * @returns a boolean flag indicates the validity of the object
 */
const areRuleOptionsValid = (input: Record<string, unknown>) => {
	const onlyDirectories = input['onlyDirectories'];
	const onlyFiles = input['onlyFiles'];

	if (
		(onlyDirectories && typeof onlyDirectories !== 'boolean') ||
		(onlyFiles && typeof onlyFiles !== 'boolean')
	) {
		return false;
	}

	return true;
};

/**
 * The function validates rule enforcement value
 * @param input the input to validate
 * @returns a boolean flag indicates the validity of the input
 */
export const isRuleEnforcementValid = (input: unknown) => {
	return input === 1 || input === 2 || input === 'warn' || input === 'error';
};

/**
 * The function validates rule array
 * @param input the input to validate
 * @returns a boolean flag indicates the validity of the array
 */
export const isRuleArrayValid = (input: unknown[]) => {
	if (input.length === 0 || input.length > 3) {
		return false;
	}

	if (!isRuleEnforcementValid(input[0])) {
		return false;
	}

	if (input.length === 1) {
		return true;
	}

	if (input.length === 2 && typeof input[1] === 'string') {
		return true;
	}

	if (input.length === 2 && typeof input[1] === 'object') {
		return areRuleOptionsValid(input[1] as Record<string, unknown>);
	}

	if (input.length === 3 && typeof input[1] === 'string' && typeof input[2] === 'object') {
		return areRuleOptionsValid(input[2] as Record<string, unknown>);
	}

	return false;
};
