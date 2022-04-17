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
	readonly outputFilePath?: string;
	readonly format?: Format;
	readonly color?: boolean;
	readonly debug?: boolean;
}
