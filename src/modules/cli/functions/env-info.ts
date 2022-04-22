import os from 'os';

import CLILoggerModule from '@/shared/modules/cli-logger';

import { asyncSpawn } from '../utils/os';
import { getNpmPackageVersion } from '../utils/npm-version';

/**
 * The function prints the enviornment info
 * @returns void
 */
export const printEnvironmentInfo = async () => {
	let npmBinVersion: string;

	try {
		const output = await asyncSpawn('npm', ['--version']);

		npmBinVersion = `v${output.trim()}`;
	} catch {
		npmBinVersion = 'Failed to get';
	}

	const inflintGlobalVersion = await getNpmPackageVersion('inflint', true);

	CLILoggerModule.service.default('Environment Info:');

	CLILoggerModule.service.emptyBlock();

	CLILoggerModule.service.default(`Node version: ${process.version}`);
	CLILoggerModule.service.default(`npm version: ${npmBinVersion}`);
	CLILoggerModule.service.default(`Local Inflint version: ${__PACKAGE_VERSION__}`);
	CLILoggerModule.service.default(`Global Inflint version: ${inflintGlobalVersion}`);
	CLILoggerModule.service.default(`Operating System: ${os.platform()} ${os.release()}`);
};
