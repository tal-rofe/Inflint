import fs from 'node:fs/promises';

import CLILoggerModule from '@/shared/modules/cli-logger';

/**
 * The function returns whether a given path is directory
 * @param directoryPath the directory path
 * @returns a boolean flag indicates whether input is directory or not
 */
export const isDirectory = async (directoryPath: string) => {
	try {
		const stats = await fs.lstat(directoryPath);

		return stats.isDirectory();
	} catch {
		CLILoggerModule.service.error(`Path not found "${directoryPath}"`);

		process.exit(1);
	}
};
