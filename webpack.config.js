'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: [
		'babel-polyfill',
		'eventsource-polyfill',
		path.resolve(__dirname, 'public/main.js')
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: path.join('assets', 'js', '[name].bundle.[hash].js'),
		chunkFilename: '[id].bundle.[hash].js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['latest']
				}
			},
			{
				test: /\.css/,
				loader: 'style-loader!css-loader'
			}
		]
	},
	resolve: {
		alias: {}
	},
	resolveLoader: {
		moduleExtensions: ['-loader'],
		alias: {}
	},
	plugins: [
		new CleanWebpackPlugin('dist'),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('assets/css/[name].bundle.[hash].css'),
		new HtmlPlugin({
			title: 'Release.mail.ru',
			filename: 'index.html',
			template: path.resolve(__dirname, 'app/index.html')
		}),
		// new webpack.optimize.UglifyJsPlugin()
	]
};
