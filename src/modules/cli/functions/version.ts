import CLILoggerModule from '@/shared/modules/cli-logger';

/**
 * The function logs the version to the console
 * @returns void
 */
export const printVersion = () => {
	CLILoggerModule.service.default(`v${__PACKAGE_VERSION__}`);
};
