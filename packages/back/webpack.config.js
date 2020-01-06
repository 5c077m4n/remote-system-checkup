const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const nestOptions = require('./nest-cli.json');

module.exports = function(options) {
	return {
		...options,
		entry: [
			'webpack/hot/poll?100',
			...Object.values(nestOptions.projects).map(val =>
				path.resolve(val.sourceRoot, val.entryFile),
			),
		],
		watch: true,
		externals: [
			nodeExternals({
				whitelist: ['webpack/hot/poll?100'],
			}),
		],
		plugins: [...options.plugins, new webpack.HotModuleReplacementPlugin()],
	};
};
