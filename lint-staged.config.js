module.exports = {
	'src/**/*.ts': ['eslint --fix', () => 'tsc --noEmit'],
	'**/*.{ts,js,json}': 'prettier --write',
	'**/*': 'inflint',
};
