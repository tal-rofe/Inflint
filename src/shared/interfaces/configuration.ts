import type { IAliasValue } from './alias';
import type { IRuleValue } from './rule';

export interface IBaseConfiguration {
	readonly rules?: Record<string, IRuleValue>;
	readonly aliases?: Record<string, IAliasValue>;
	readonly ignorePath?: string;
	readonly ignore?: boolean;
	ignorePatterns?: string[];
	readonly quiet?: boolean;
	readonly maxWarnings?: number;
	readonly bail?: number;
	readonly outputFile?: string;
}

export interface ICLIConfiguration extends IBaseConfiguration {
	readonly inflintrc?: boolean;
	readonly configFilePath?: string;
	readonly color?: boolean;
}

export interface ISourceConfiguration extends IBaseConfiguration {
	readonly extends?: string;
}
