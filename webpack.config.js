'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
	devtool: 'inline-source-map',
	cache: true,
	entry: {
		sample: path.resolve(__dirname, 'public/main.js'),
		vendor: ['babel-polyfill', 'eventsource-polyfill', 'milligram']
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: path.join('js', '[name].bundle.[hash].js'),
		publicPath: '/dist/'
		// publicPath: 'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-static/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components|sw.js)/,
				loader: 'babel-loader',
				query: {
					presets: ['latest']
				}
			},
			{
				test: /\.s?css/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: ['css-loader', 'postcss-loader', 'sass-loader']
				})
			},
			{
				test: /\.tmpl\.xml/,
				loader: 'fest-loader'
			}
		]
	},
	resolve: {
		alias: {}
	},
	resolveLoader: {
		moduleExtensions: ['-loader'],
		alias: {
			'fest-loader': path.resolve(__dirname, './fest-loader')
		}
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.NoErrorsPlugin(),
		new HtmlPlugin({
			filename: path.resolve(__dirname, 'index/index.html'),
			template: path.resolve(__dirname, 'public/index.html')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: path.join('js', '[name].bundle.[hash].js')
		}),
		new ExtractTextPlugin('css/[name].bundle.[hash].css'),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false,
			compress: {
				sequences: true,
				booleans: true,
				loops: true,
				unused: true,
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		}),
	]
};
