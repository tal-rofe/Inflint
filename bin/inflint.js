#!/usr/bin/env node

import fs from 'node:fs/promises';

// To use V8's code cache to speed up instantiation time
import 'v8-compile-cache';

import '../dist/index.js';

async function onFatalError(error) {
	process.exitCode = 1;

	const message = error.message || error;

	const packageJsonData = await fs.readFile('package.json', 'utf8');
	const packageJsonObject = JSON.parse(packageJsonData);
	const version = packageJsonObject.version;

	console.error(`
Something went wrong! :(
Inflint: ${version}
${message}`);
}

process.on('uncaughtException', onFatalError);
process.on('unhandledRejection', onFatalError);
