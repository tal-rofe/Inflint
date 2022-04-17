import { IBaseConfiguration } from '@/interfaces/base-configuration';

export interface IConfiguration extends IBaseConfiguration {
	readonly extends?: string;
}
