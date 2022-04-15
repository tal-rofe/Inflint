import { getCLIArgv } from '@/utils/cli-argv';
import { startCLIPhase } from '@/utils/cli-phase';

(() => {
	const argv = getCLIArgv();

	startCLIPhase(argv);
})();
