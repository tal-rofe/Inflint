import type { Config } from '@exlint.io/inflint';

const inflintConfig: Config = {
	rules: {
		'src/**/*': [2, 'kebab-case.point'],
		'{assets,scripts,bin}/**/*': [2, 'kebab-case'],
	},
};

export default inflintConfig;
