const HtmlWebPackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

console.log('server webpack');
module.exports = {
	context: __dirname,
	mode: 'development',
	entry: './src/server/index.ts',
	output: {
		path: path.resolve(__dirname, 'src/server/build'),
		filename: 'main.js',
		publicPath: '/',
	},
	devServer: {
		historyApiFallback: true,
	},
	target: 'node',
	externals: [nodeExternals()],
	node: {
		__dirname: false,
	},
	module: {
		rules: [
			{
				test: /\.(ts)|(js)$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						retainLines: true,
						presets: ['@babel/preset-typescript'],
					},
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.ts'],
		plugins: [
			new TsconfigPathsPlugin({
				configFile: path.resolve(__dirname, './tsconfig.json'),
			}),
		],
	},
};
