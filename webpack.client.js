const HtmlWebPackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

console.log('client webpack');
console.log(path.resolve(__dirname, 'src/client/dist'));
// module.exports = {
// 	context: __dirname,
// 	entry: './src/client/index.tsx',
// 	output: {
// 		path: path.resolve(__dirname, 'src/client/dist'),
// 		filename: 'main.js',
// 	},
// 	devServer: {
// 		historyApiFallback: true,
// 	},
// 	module: {
// 		rules: [
// 			{
// 				test: /\.(js|jsx)$/,
// 				exclude: /node_modules/,
// 				use: ['babel-loader'],
// 			},
// 			{
// 				test: /\.(ts|tsx)$/,
// 				exclude: /node_modules/,
// 				use: ['ts-loader'],
// 			},
// 			{
// 				test: /\.(css|scss)$/,
// 				use: ['style-loader', 'css-loader'],
// 			},
// 			{
// 				test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
// 				use: ['file-loader'],
// 			},
// 		],
// 	},
// 	resolve: {
// 		extensions: ['.js', '.ts', '.jsx', '.tsx'],
// 		plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
// 	},
// 	plugins: [
// 		new HtmlWebPackPlugin({
// 			template: path.join(__dirname, 'src', 'client', 'dist', 'index.html'),
// 			filename: 'index.html',
// 			inject: 'body',
// 		}),
// 	],
// };

const config = {
	mode: 'production',
	entry: './src/client/index.tsx',

	// entry: {
	// 	index: './src/index.tsx',
	// },
	output: {
		path: path.resolve(__dirname, 'src/client/dist'),
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx'],
		plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
};

// if (isProd) {
// 	config.optimization = {
// 		minimizer: [new TerserWebpackPlugin()],
// 	};
// } else {
// 	config.devServer = {
// 		port: 9000,
// 		open: true,
// 		hot: true,
// 		compress: true,
// 		stats: 'errors-only',
// 		overlay: true,
// 	};
// }

module.exports = config;
