import fs from 'fs/promises';
import path from 'path';

import YAML from 'yaml';

import { withCleanObject } from '@/utils/object';

import type { IFileFormat, IBooleanQuestion } from '../interfaces/init';

/**
 * The function receives some configuration from the init process and exports the relevant files to user filesystem
 * @param fileFormat the format of the main configuration file
 * @param withIgnoreFile whether to create an ignore file
 * @param aliases the user-created aliases
 * @returns void
 */
export const exportFilesFromInit = async (
	fileFormat: IFileFormat,
	withIgnoreFile: IBooleanQuestion,
	aliases: Record<string, string>,
) => {
	const contentObject = withCleanObject({
		aliases: Object.keys(aliases).length > 0 ? aliases : undefined,
	});

	let contentString: string;
	let filename: string;

	if (fileFormat === 'YAML') {
		contentString = Object.keys(contentObject).length > 0 ? YAML.stringify(contentObject) : '';
		filename = '.inflintrc.yml';
	} else if (fileFormat === 'Javascript') {
		contentString = `module.exports = ${JSON.stringify(contentObject, null, 2)};`;
		filename = '.inflintrc.js';
	} else if (fileFormat === 'Typescript') {
		contentString = [
			"import { Config } from 'inflint'",
			'',
			`const inflintConfig = ${JSON.stringify(contentObject, null, 2)};`,
			'',
			'export default inflintConfig;',
		].join('\n');
		filename = '.inflintrc.ts';
	} else {
		contentString = JSON.stringify(contentObject, null, 2);
		filename = '.inflintrc.json';
	}

	const writeConfigFilePromise = fs.writeFile(path.join(process.cwd(), filename), contentString);

	if (withIgnoreFile === 'No') {
		await writeConfigFilePromise;
	} else {
		const ignoreFilename = '.inflintignore';

		await Promise.all([
			writeConfigFilePromise,
			fs.writeFile(path.join(process.cwd(), ignoreFilename), ''),
		]);
	}
};
