#!/usr/bin/env node

// to use V8's code cache to speed up instantiation time
require('v8-compile-cache');

function onFatalError(error) {
	process.exitCode = 1;

	const { version } = require('../package.json');
	const message = error.message || error;

	console.error(`
Something went wrong! :(
Inflint: ${version}
${message}`);
}

process.on('uncaughtException', onFatalError);
process.on('unhandledRejection', onFatalError);

require('../dist/index');
