import path from 'path';

import { asyncSpawn } from './os';
import { normalizeVersion } from './normalize-version';

const isChildOfDirectory = (parentPath: string, childPath: string) => {
	return !path.relative(parentPath, childPath).startsWith('..');
};

export const getNpmPackageVersion = async (pkg: string, global: boolean) => {
	const npmBinArgs = ['bin', '-g'];
	const npmLsArgs = ['ls', '--depth=0', '--json', 'eslint'];

	if (global) {
		npmLsArgs.push('-g');
	}

	try {
		const output = await asyncSpawn('npm', npmLsArgs);
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
			npmBinPath = await asyncSpawn('npm', npmBinArgs);
		} catch (e) {
			return 'Not found';
		}

		const isGlobal = isChildOfDirectory(npmBinPath, processBinPath ?? '');
		let pkgVersion = parsedStdout.dependencies.eslint.version;

		if ((global && isGlobal) || (!global && !isGlobal)) {
			pkgVersion += ' (Currently used)';
		}

		return normalizeVersion(pkgVersion);
	} catch (e) {
		return 'Not found';
	}
};
