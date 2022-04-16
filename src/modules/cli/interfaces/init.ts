export type IBooleanQuestion = 'Yes' | 'No';

export type IFileFormat = 'Javascript' | 'JSON' | 'YAML';

export interface IAliasAnswer {
	readonly name: string;
	readonly regex: string;
	readonly with_resume: IBooleanQuestion;
}

export interface IInitialAnswers {
	readonly file_format: IFileFormat;
	readonly with_ignore_file: IBooleanQuestion;
	readonly with_aliases: IBooleanQuestion;
}

export type IAliasAnswers = Omit<IAliasAnswer, 'with_resume'>[];
