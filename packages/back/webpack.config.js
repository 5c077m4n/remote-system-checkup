const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const nestOptions = require('./nest-cli.json');

module.exports = function(options) {
	const isProd = options.mode === 'production';
	const entry =
		options.entry ||
		Object.fromEntries(
			Object.entries(nestOptions.projects).map(([key, val]) => [
				key,
				path.resolve(val.sourceRoot, val.entryFile) + '.ts',
			]),
		);

	if (isProd) {
		return {
			...options,
			entry,
			externals: [],
			plugins: [...options.plugins],
		};
	} else {
		return {
			...options,
			entry:
				typeof entry === 'string'
					? { index: 'webpack/hot/poll?100', main: entry }
					: { index: 'webpack/hot/poll?100', ...entry },
			watch: true,
			externals: [nodeExternals({ whitelist: ['webpack/hot/poll?100'] })],
			plugins: [
				...options.plugins,
				new webpack.HotModuleReplacementPlugin(),
			],
		};
	}
};
