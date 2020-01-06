const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const nestOptions = require('./nest-cli.json');

module.exports = function(options) {
	return {
		...options,
		entry:
			options.entry ||
			Object.fromEntries(
				Object.entries(nestOptions.projects).map(([key, val]) => [
					key,
					path.resolve(val.sourceRoot, val.entryFile) + '.ts',
				]),
			),
		watch: true,
		externals: [
			nodeExternals({
				whitelist: ['webpack/hot/poll?100'],
			}),
		],
		plugins: [...options.plugins, new webpack.HotModuleReplacementPlugin()],
	};
};
