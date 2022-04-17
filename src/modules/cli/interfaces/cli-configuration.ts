import { IBaseConfiguration } from '@/interfaces/base-configuration';

export interface ICLIConfiguration extends IBaseConfiguration {
	readonly inflintrc?: boolean;
	readonly configFilePath?: string;
	readonly printRuleFilePath?: string;
}
