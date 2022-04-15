type IRuleEnforcement = 0 | 1 | 2 | 'off' | 'warn' | 'error';

type IRules = Record<string, [IRuleEnforcement, string]>;

type IFormat =
	| 'checkstyle'
	| 'compact'
	| 'html'
	| 'jslint-xml'
	| 'json'
	| 'junit'
	| 'stylish'
	| 'tap'
	| 'unix'
	| 'visualstudio';

export interface IConfiguration {
	readonly noInflintrc: boolean;
	readonly config: string | null;
	readonly rules: IRules;
	readonly ignoreFile: string;
	readonly noIgnoreFile: boolean;
	readonly ignorePattern: ReadonlyArray<string>;
	readonly quiet: boolean;
	readonly maxWarnings: number;
	readonly outputFile: string;
	readonly format: IFormat;
	readonly color: boolean;
	readonly noColor: boolean;
	readonly printRule: string;
	readonly version: boolean;
	readonly bail: boolean;
	readonly help: boolean;
	readonly extends: string;
	readonly files: ReadonlyArray<string>;
	readonly warn: boolean;
	readonly debug: boolean;
}
