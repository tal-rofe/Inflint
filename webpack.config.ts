import path from 'path';

import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import WebpackShellPluginNext from 'webpack-shell-plugin-next';

import { version } from './package.json';

const configuration: webpack.Configuration = {
	context: __dirname,
	mode: 'production',
	target: 'node',
	entry: './src/index.ts',
	// * https://stackoverflow.com/questions/48673408/should-javascript-npm-packages-be-minified
	optimization: {
		minimize: false,
	},
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
		new WebpackShellPluginNext({
			onBuildStart: {
				scripts: ['rimraf dist'],
				blocking: true,
			},
			safe: true,
		}),
		new webpack.DefinePlugin({
			__PACKAGE_VERSION__: `'v${version}'`,
		}),
		new ForkTsCheckerWebpackPlugin({
			typescript: { configFile: 'tsconfig.build.json', context: __dirname },
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

export default configuration;
