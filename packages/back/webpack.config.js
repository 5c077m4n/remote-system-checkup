const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const nestOptions = require('./nest-cli.json');

const WEBPACK_HOT_MODULE = 'webpack/hot/poll?100';

module.exports = function(options) {
	const isProd = options.mode === 'production';

	let entry = options.entry;
	if (!isProd) {
		if (typeof entry === 'string') {
			entry = [WEBPACK_HOT_MODULE, entry];
		} else if (Array.isArray(entry) && entry[0] !== WEBPACK_HOT_MODULE) {
			entry = [WEBPACK_HOT_MODULE].concat(entry);
		}
	}
	if (!entry) {
		entry = Object.fromEntries(
			Object.entries(nestOptions.projects).map(([key, val]) => {
				const projPath = path
					.resolve(val.sourceRoot, val.entryFile)
					.concat('.ts');

				return [
					key,
					isProd ? projPath : [WEBPACK_HOT_MODULE].concat(projPath),
				];
			}),
		);
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
