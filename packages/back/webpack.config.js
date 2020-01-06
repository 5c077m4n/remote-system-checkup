const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const nestOptions = require('./nest-cli.json');

module.exports = function(options) {
	const isProd = options.mode === 'production';
	const entries =
		options.entry ||
		Object.fromEntries(
			Object.entries(nestOptions.projects).map(([key, val]) => [
				key,
				path.resolve(val.sourceRoot, val.entryFile) + '.ts',
			]),
		);

	return isProd
		? {
				...options,
				entry: entries,
				externals: [],
				plugins: [...options.plugins],
		  }
		: {
				...options,
				entry: { ...entries, index: 'webpack/hot/poll?100' },
				watch: true,
				externals: [
					nodeExternals({ whitelist: ['webpack/hot/poll?100'] }),
				],
				plugins: [
					...options.plugins,
					new webpack.HotModuleReplacementPlugin(),
				],
		  };
};
