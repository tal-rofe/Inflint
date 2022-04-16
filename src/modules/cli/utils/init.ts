import fs from 'fs/promises';
import path from 'path';

import YAML from 'yaml';

import { cleanObject } from '@/utils/object';

import type { IFileFormat, IBooleanQuestion, IAliasAnswers } from '../models/init';

/**
 * The function converts an array of aliases to an object from answers
 * @param aliasesAnswers the aliases to convert from answers
 * @returns the converted object
 */
export const convertAliasesAnswers = (aliasesAnswers: IAliasAnswers) => {
	return aliasesAnswers.reduce<Record<string, string>>((final, value) => {
		return {
			...final,
			[value.name]: value.regex,
		};
	}, {});
};

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
	const contentObject = {
		aliases: Object.keys(aliases).length > 0 ? aliases : undefined,
	};

	cleanObject(contentObject);

	let contentString: string;
	let filename: string;

	if (fileFormat === 'YAML') {
		contentString = Object.keys(contentObject).length > 0 ? YAML.stringify(contentObject) : '';
		filename = '.inflintrc.yml';
	} else if (fileFormat === 'Javascript') {
		contentString = `module.exports = ${JSON.stringify(contentObject, null, 2)};`;
		filename = '.inflintrc.js';
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
