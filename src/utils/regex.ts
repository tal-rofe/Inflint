/**
 * The function escapes a string representing a regex
 * @param input the regex string to escape
 * @returns the escaped result
 */
export const escapeRegex = (input: string) => {
	return input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
