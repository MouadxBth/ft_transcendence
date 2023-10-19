const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

const swcDefaultConfig = require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory().swcOptions;

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: ['webpack/hot/poll?100', './src/main.ts'],
	target: 'node',
	externals: [
		nodeExternals({
			allowlist: ['webpack/hot/poll?100'],
		}),
	],
	module: {
		rules: [
			{
				test: /.tsx?$/,
				use: {
					loader: 'swc-loader',
					options: swcDefaultConfig
				},
				exclude: /node_modules/,
			},
		],
	},
	mode: 'development',
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new BundleAnalyzerPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new RunScriptWebpackPlugin({ name: 'server.js', autoRestart: false }),
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'server.js',
	},
};
