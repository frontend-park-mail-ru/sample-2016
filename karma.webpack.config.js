'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
	devtool: 'inline-source-map',
	cache: true,
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['latest']
				}
			},
			{
				test: /\.css/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: "style-loader",
					loader: "css-loader"
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
		new CleanWebpackPlugin('dist'),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('assets/css/[name].bundle.[hash].css'),
		new HtmlPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, 'public/index.html')
		}),
		// new webpack.optimize.UglifyJsPlugin()
	]
};
