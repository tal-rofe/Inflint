import { Format } from '../models/format';
import { IAliasValue } from './alias';
import { IRuleValue } from './rule';

export interface IBaseConfiguration {
	readonly rules?: Record<string, IRuleValue>;
	readonly aliases?: Record<string, IAliasValue>;
	readonly ignoreFilePath?: string;
	readonly ignore?: boolean;
	ignorePatterns?: string[];
	readonly quiet?: boolean;
	readonly maxWarnings?: number;
	readonly bail?: number;
	readonly outputFilePath?: string;
	readonly format?: Format;
}

export interface ICLIConfiguration extends IBaseConfiguration {
	readonly inflintrc?: boolean;
	readonly configFilePath?: string;
	readonly color?: boolean;
	readonly printRuleFilePath?: string;
}

export interface ISourceConfiguration extends IBaseConfiguration {
	readonly extends?: string;
}
