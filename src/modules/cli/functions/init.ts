import inquirer from 'inquirer';

import { exportFilesFromInit } from '../utils/init';
import { convertAliasesAnswers } from '../pipes/alias';
import type { IAliasAnswer, IInitialAnswers, IAliasAnswers } from '../interfaces/init';

/**
 * The function initialize the project with basic Inflint configuration
 * @returns void
 */
export const initConfiguration = async () => {
	const initialQuestions: inquirer.QuestionCollection = [
		{
			type: 'list',
			name: 'file_format',
			message: 'Please choose the configuration file format:',
			default: 'Javascript',
			choices: ['Javascript', 'Typescript', 'JSON', 'YAML'],
		},
		{
			type: 'list',
			name: 'with_ignore_file',
			message: 'Do you want to create an ignore file?',
			default: 'Yes',
			choices: ['Yes', 'No'],
		},
		{
			type: 'list',
			name: 'with_aliases',
			message: 'Do you want to set some aliases to your configuration?',
			default: 'No',
			choices: ['Yes', 'No'],
		},
	];

	const initialAnswers = await inquirer.prompt<IInitialAnswers>(initialQuestions);
	const aliasesAnswers: IAliasAnswers = [];

	if (initialAnswers.with_aliases === 'Yes') {
		let stopAliases = false;

		do {
			const aliasQuestions: inquirer.QuestionCollection = [
				{
					type: 'input',
					name: 'name',
					message: 'Enter name of the alias:',
					validate: (input: string) => (input ? true : 'Please enter an alias name'),
				},
				{
					type: 'input',
					name: 'regex',
					message: 'Enter regex the alias will match:',
					validate: (input: string) => (input ? true : 'Please enter a regex for the alias'),
				},
				{
					type: 'list',
					name: 'with_resume',
					message: 'Do you want to set an another alias?',
					default: 'Yes',
					choices: ['Yes', 'No'],
				},
			];

			const aliasAnswers = await inquirer.prompt<IAliasAnswer>(aliasQuestions);

			aliasesAnswers.push({
				name: aliasAnswers.name,
				regex: aliasAnswers.regex,
			});

			if (aliasAnswers.with_resume === 'No') {
				stopAliases = true;
			}
		} while (!stopAliases);
	}

	const convertedAliases = convertAliasesAnswers(aliasesAnswers);

	await exportFilesFromInit(initialAnswers.file_format, initialAnswers.with_ignore_file, convertedAliases);
};
