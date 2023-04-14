const inflintConfig = {
	rules: {
		'./src/**/*': [2, 'kebab-case.point'],
		'./{assets,scripts,bin}/**/*': [2, 'kebab-case'],
	},
};

module.exports = inflintConfig;
