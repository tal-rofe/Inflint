import minimist from 'minimist';

/**
 * The function returns the argv from the CLI
 * @returns argv from CLI
 */
export const getCLIArgv = () => {
	const argv = minimist(process.argv.slice(2));

	return argv;
};
