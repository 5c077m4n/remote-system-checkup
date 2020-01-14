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
				path.resolve(val.sourceRoot, val.entryFile).concat('.ts'),
			]),
		);
	const plugins = isProd
		? [...options.plugins]
		: [...options.plugins, new webpack.HotModuleReplacementPlugin()];

	return {
		...options,
		entry,
		watch: !isProd,
		watchOptions: { aggregateTimeout: 300, poll: 500 },
		externals: [nodeExternals({ whitelist: [] })],
		plugins,
	};
};
