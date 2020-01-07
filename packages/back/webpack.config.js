const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const nestOptions = require('./nest-cli.json');

const WEBPACK_HOT_MODULE = 'webpack/hot/poll?100';

module.exports = function(options) {
	const isProd = options.mode === 'production';

	let entry = [...options.entry];
	if (!isProd) {
		if (typeof options.entry === 'string') {
			entry = [WEBPACK_HOT_MODULE, ...options.entry];
		} else if (
			Array.isArray(options.entry) &&
			options.entry[0] !== WEBPACK_HOT_MODULE
		) {
			entry = [WEBPACK_HOT_MODULE].concat(options.entry);
		} else if (!options.entry) {
			entry = Object.fromEntries(
				Object.entries(nestOptions.projects).map(([key, val]) => [
					key,
					[
						WEBPACK_HOT_MODULE,
						path
							.resolve(val.sourceRoot, val.entryFile)
							.concat('.ts'),
					],
				]),
			);
		}
	}
	const plugins = isProd
		? [...options.plugins]
		: [...options.plugins, new webpack.HotModuleReplacementPlugin()];
	const whitelist = isProd ? [] : [WEBPACK_HOT_MODULE];

	return {
		...options,
		entry,
		watch: !isProd,
		externals: [nodeExternals({ whitelist })],
		plugins,
	};
};
