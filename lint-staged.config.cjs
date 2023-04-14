const config = {
	'./**/*.ts': ['eslint --fix -c ./.eslintrc.cjs', () => 'tsc --noEmit'],
	'./**/*.{ts,js,json}': 'prettier --write -c ./.prettierrc.cjs',
	'./**/*': 'inflint -c ./inflint.config.cjs',
};

module.exports = config;
