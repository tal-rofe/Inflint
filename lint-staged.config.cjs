const config = {
	'./**/*.ts': ['eslint --fix -c ./.eslintrc.cjs', () => 'tsc --noEmit'],
	'./**/*.{ts,js,json,yaml}': 'prettier --write -c ./.prettierrc.cjs',
	'./**/*': ['inflint -c ./inflint.config.cjs', 'cspell lint -c ./cspell.json --no-progress --no-summary'],
};

module.exports = config;
