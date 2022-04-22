/**
 * The function normalizes the version string with "v" prefix
 * @param version the version to normalize
 * @returns normalized version
 */
export const normalizeVersion = (version: string) => {
	return version.startsWith('v') ? version : `v${version}`;
};
