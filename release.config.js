const config = {
	branches: ['main'],
	repositoryUrl: 'git+https://github.com/Exlint/Inflint',
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		'@semantic-release/npm',
		'@semantic-release/git',
		'@semantic-release/github',
	],
};

module.exports = config;
