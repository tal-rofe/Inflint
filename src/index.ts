import { getCLIArgv } from '@/utils/argv';
import StartCLI from '@/modules/cli';
import StartConfiguration from '@/modules/configuration';

(() => {
	const argv = getCLIArgv();

	const configFromCLI = StartCLI(argv);

	if (configFromCLI) {
		StartConfiguration();
	}
})();
