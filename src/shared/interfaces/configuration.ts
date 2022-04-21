import { Format } from '../models/format';
import { IRuleValue } from './rule';

export interface IBaseConfiguration {
	readonly rules?: Record<string, IRuleValue>;
	readonly aliases?: Record<string, string>;
	readonly ignoreFilePath?: string;
	readonly ignore?: boolean;
	readonly ignorePatterns?: ReadonlyArray<string>;
	readonly quiet?: boolean;
	readonly maxWarnings?: number;
	readonly bail?: number;
	readonly outputFilePath?: string;
	readonly format?: Format;
	readonly color?: boolean;
	readonly debug?: boolean;
}

export interface ICLIConfiguration extends IBaseConfiguration {
	readonly inflintrc?: boolean;
	readonly configFilePath?: string;
	readonly printRuleFilePath?: string;
}

export interface ISourceConfiguration extends IBaseConfiguration {
	readonly extends?: string;
}
