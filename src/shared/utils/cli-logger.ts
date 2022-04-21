/**
 * The function receives object representing CLI prints and calculates the spaces bias to get stylish print
 * @param input the prints object
 * @returns the space bias
 */
export const calcSpaceBias = (input: Record<string, [string, string]>) => {
	return (
		Object.values(input).reduce<number>((final, value) => {
			return Math.max(final, value[0]!.length);
		}, 0) + 3
	);
};
