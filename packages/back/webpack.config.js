const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const nestOptions = require('./nest-cli.json');

module.exports = function(options) {
	const isProd = options.mode === 'production';
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

	return {
		...options,
		entry,
		watch: !isProd,
		externals: [
			nodeExternals({
				whitelist: ['webpack/hot/poll?100'],
			}),
		],
		plugins,
	};
};
