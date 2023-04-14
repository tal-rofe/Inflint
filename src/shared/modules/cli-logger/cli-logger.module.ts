import { getCLIArgv } from '@/utils/argv';

import type CLILoggerService from './cli-logger.service';
import CLILoggerColorfulController from './cli-logger-colorful.controller';
import CLILoggerDryController from './cli-logger-dry.controller';

export default class CLILoggerModule {
	// eslint-disable-next-line no-use-before-define
	private static _instance: CLILoggerModule;
	private _service: CLILoggerService;

	private constructor() {
		const argv = getCLIArgv();
		const withColor = argv['color'] === undefined || argv['color'] === true;

		if (withColor) {
			this._service = new CLILoggerColorfulController();
		} else {
			this._service = new CLILoggerDryController();
		}
	}

	private static get instance() {
		if (this._instance) {
			return this._instance;
		}

		const newInstance = new CLILoggerModule();

		return newInstance;
	}

	public static get service() {
		return this.instance._service;
	}
}
