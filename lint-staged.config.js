module.exports = {
	'src/**/*.ts': 'eslint --fix',
	'**/*.{ts,js,json}': 'prettier --write',
	'**/*': 'inflint',
};
