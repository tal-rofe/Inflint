import fs from 'fs/promises';
import path from 'path';

import CLILoggerModule from '../modules/cli-logger';
import { IRuleConsoleDetails } from '../interfaces/rule';

const print = (details: IRuleConsoleDetails, isError: boolean) => {
	const absolutePath = path.join(process.cwd(), details.filePath);

	const prints: string[] = [];

	prints.push(absolutePath);

	const linkString = details.isFolder ? 'folder' : 'file';
	const typeString = isError ? 'error' : 'warning';

	if (!details.alias) {
		prints.push(`  ${typeString} This ${linkString} is unexpected (Rule key: "${details.key}")`);
	} else {
		prints.push(
			`  ${typeString} Expected ${linkString} name to match "${details.alias}" (Rule key: "${details.key}")`,
		);
	}

	return prints.join('\n');
};

const summaryPrint = (errorsCount: number, warningsCount: number) => {
	if (errorsCount === 0 && warningsCount === 0) {
		return '✔️  Done! (0 errors, 0 warnings)';
	}

	if (errorsCount === 0) {
		const problemsString = warningsCount === 1 ? 'problem' : 'problems';
		const warningsString = warningsCount === 1 ? 'warning' : 'warnings';

		return `✖  ${warningsCount} ${problemsString} (0 errors, ${warningsCount} ${warningsString})`;
	}

	const problemsString = errorsCount === 1 ? 'problem' : 'problems';
	const errorsString = errorsCount === 1 ? 'error' : 'errors';
	const warningsString = warningsCount === 1 ? 'warning' : 'warnings';
	const totalProblems = errorsCount + warningsCount;

	return `✖  ${totalProblems} ${problemsString} (${errorsCount} ${errorsString}, ${warningsCount} ${warningsString})`;
};

export const outputFile = async (
	filePath: string,
	errors: IRuleConsoleDetails[],
	warnings: IRuleConsoleDetails[],
) => {
	const absoluteFilePath = path.join(process.cwd(), filePath);

	try {
		if (errors.length === 0 && warnings.length === 0) {
			const content = summaryPrint(0, 0);

			await fs.writeFile(absoluteFilePath, content);

			return;
		}

		const errorsPrints = errors.map((error) => print(error, true)).join('\n');
		const warningsPrints = warnings.map((warning) => print(warning, false)).join('\n');
		const summaryPrintStr = summaryPrint(errors.length, warnings.length);

		const finalOutput = `${errorsPrints}\n${warningsPrints}\n${summaryPrintStr}`;

		await fs.writeFile(absoluteFilePath, finalOutput);
	} catch {
		CLILoggerModule.service.error('Failed to write output file');

		process.exit(1);
	}
};
