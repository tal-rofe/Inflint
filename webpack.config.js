const path = require('path');

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const { version } = require('./package.json');

module.exports = {
	mode: 'production',
	target: 'node',
	entry: './src/index.ts',
	externals: [
		nodeExternals({
			modulesDir: path.resolve(__dirname, 'node_modules'),
		}),
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.build.json',
						},
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			__PACKAGE_VERSION__: `'v${version}'`,
		}),
	],
	resolve: {
		extensions: ['.ts'],
		plugins: [
			new TsconfigPathsPlugin({
				configFile: 'tsconfig.build.json',
				extensions: ['.ts'],
			}),
		],
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
