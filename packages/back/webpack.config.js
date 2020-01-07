const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const nestOptions = require('./nest-cli.json');

const WEBPACK_HOT_MODULE = 'webpack/hot/poll?100';

module.exports = function(options) {
	const isProd = options.mode === 'production';
<<<<<<< HEAD
	let entry;
	if (isProd) {
		entry = options.entry;
	} else {
		if (typeof options.entry === 'string') {
			entry = [WEBPACK_HOT_MODULE, options.entry];
		} else if (typeof options.entry === 'object') {
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
		} else if (Array.isArray(options.entry)) {
			options.entry.unshift(WEBPACK_HOT_MODULE);
		} else {
			entry = options.entry;
		}
	}
	const plugins = isProd
		? [...options.plugins]
		: [...options.plugins, new webpack.HotModuleReplacementPlugin()];
	const whitelist = isProd ? [] : [WEBPACK_HOT_MODULE];
=======
	const entry = options.entry || {
		index: 'webpack/hot/poll?100',
		...Object.fromEntries(
			Object.entries(nestOptions.projects).map(([key, val]) => [
				key,
				path.resolve(val.sourceRoot, val.entryFile).concat('.ts'),
			]),
		),
	};
	const plugins = isProd
		? [...options.plugins]
		: [...options.plugins, new webpack.HotModuleReplacementPlugin()];
>>>>>>> 334f9774c0162957f83c9d88105b13b85d30a9e5

	return {
		...options,
		entry,
		watch: !isProd,
<<<<<<< HEAD
		externals: [nodeExternals({ whitelist })],
=======
		externals: [
			nodeExternals({
				whitelist: ['webpack/hot/poll?100'],
			}),
		],
>>>>>>> 334f9774c0162957f83c9d88105b13b85d30a9e5
		plugins,
	};
};
