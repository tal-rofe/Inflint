import type { SpawnOptions } from 'node:child_process';

import spawnAsync from '@expo/spawn-async';

const EXECUTION_TIMEOUT = 10 * 1000;

/**
 * Must wrap with try & catch when using this function
 * ----------------------------------------------------
 * The function receives a command to execute and returns a promise resolving to the execution output
 * @param command the command to execute
 * @param args execution arguments
 * @param options execution options
 * @returns A promise resolves to the execution output
 */
export const asyncSpawn = async (
	command: string,
	arguments_?: ReadonlyArray<string>,
	options?: SpawnOptions | null,
) => {
	const timeout = options?.timeout ?? EXECUTION_TIMEOUT;
	const killSignal: NodeJS.Signals = 'SIGINT';

	const extendedOptions = {
		...(options ?? {}),
		timeout,
		killSignal,
	};

	const executionTimeout = setTimeout(() => {
		throw new Error('Command failed due to timeout');
	}, timeout);

	try {
		const { stdout } = await spawnAsync(command, arguments_, extendedOptions);

		return stdout;
	} finally {
		clearTimeout(executionTimeout);
	}
};
