import CLILoggerService from '@/services/cli-logger';
import { version } from '@/libs/version';

/**
 * The function logs the version to the console
 * @returns void
 */
export const printVersion = () => {
	CLILoggerService.logDefault(`v${version}`);
};
