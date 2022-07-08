import path from 'path';
import fs from 'fs/promises';

import CLILoggerModule from '@/shared/modules/cli-logger';

import { DEFAULT_PATH } from '../models/ignore-file';

export const readIgnoreFile = async (filePath?: string) => {
	let absoluteIgnorePath: string;

	if (!filePath) {
		absoluteIgnorePath = DEFAULT_PATH;
	} else {
		absoluteIgnorePath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
	}

	try {
		const fileContent = await fs.readFile(absoluteIgnorePath, 'utf8');

		return fileContent.split(/\r?\n/);
	} catch {
		if (filePath !== undefined) {
			CLILoggerModule.service.error(`Failed to read ignore file with path: '${filePath}'`);

			process.exit(1);
		}
	}

	return [];
};
