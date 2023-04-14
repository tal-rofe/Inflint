import path from 'node:path';

import { asyncSpawn } from './os';
import { normalizeVersion } from './normalize-version';

const isChildOfDirectory = (parentPath: string, childPath: string) => {
	return !path.relative(parentPath, childPath).startsWith('..');
};

export const getNpmPackageVersion = async (pkg: string, global: boolean) => {
	const npmBinArguments = ['bin', '-g'];
	const npmLsArguments = ['ls', '--depth=0', '--json', 'eslint'];

	if (global) {
		npmLsArguments.push('-g');
	}

	try {
		const output = await asyncSpawn('npm', npmLsArguments);
		const parsedStdout = JSON.parse(output);

		if (
			Object.keys(parsedStdout).length === 0 ||
			!(parsedStdout.dependencies && parsedStdout.dependencies[pkg])
		) {
			return 'Not found';
		}

		const [, processBinPath] = process.argv;
		let npmBinPath;

		try {
			npmBinPath = await asyncSpawn('npm', npmBinArguments);
		} catch {
			return 'Not found';
		}

		const isGlobal = isChildOfDirectory(npmBinPath, processBinPath ?? '');
		let packageVersion = parsedStdout.dependencies.eslint.version;

		if ((global && isGlobal) || (!global && !isGlobal)) {
			packageVersion += ' (Currently used)';
		}

		return normalizeVersion(packageVersion);
	} catch {
		return 'Not found';
	}
};
