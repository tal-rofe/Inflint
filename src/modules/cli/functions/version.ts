import CLILoggerService from '@/services/cli-logger';
import packageJson from '../../../../package.json';

/**
 * The function logs the version to the console
 * @returns void
 */
export const printVersion = () => {
	CLILoggerService.logDefault(`v${packageJson.version}`);
};
