/**
 * The function remove "undefined" fields from the object
 * @param input the object to clean
 * @returns void
 */
export const withCleanObject = <T extends object>(input: T) => {
	const object = { ...input };

	Object.keys(object).forEach(
		(key) => object[key as keyof T] === undefined && delete object[key as keyof T],
	);

	return object;
};
