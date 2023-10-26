const nodeExternals = require("webpack-node-externals");
const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = function (options, webpack) {
	return {
		entry: ["webpack/hot/poll?100", "./src/main.ts"],
		externals: [
			nodeExternals({
				allowlist: ["webpack/hot/poll?100"],
			}),
		],
		module: {
			rules: [
				{
					test: /.tsx?$/,
					use: {
						loader: "swc-loader",
						options: {
							configFile: "./.swcrc",
						},
					},
					exclude: /node_modules/,
				},
			],
		},
		target: "node",
		mode: "development",
		plugins: [
			...options.plugins,
			new BundleAnalyzerPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.WatchIgnorePlugin({
				paths: [/\.js$/, /\.d\.ts$/],
			}),
			new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: false }),
		],
	};
};
