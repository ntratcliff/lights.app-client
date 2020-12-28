const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: {
		app: './src/index.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Production',
			filename: 'index.html',
			template: 'index.html',
			inject: 'body'
		}),
		new CopyWebpackPlugin([{
			from: resolve('static/img'),
			to: resolve('dist/static/img'),
			toType: 'dir'
		}]),
		new VueLoaderPlugin()
	],
	resolve: {
		extensions: ['*', '.vue', '.js', '.json'],
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		alias: {
			src: resolve('src'),
			components: resolve('src/components'),
			pages: resolve('src/pages'),
			router: resolve('src/router'),
			assets: resolve('assets'),
			vue$: 'vue/dist/vue.common.js'
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|vue)$/,
				exclude: /node_modules/,
				use: 'eslint-loader',
				enforce: 'pre'
			},
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.js$/,
				use: 'babel-loader'
			}
		]
	},
	output: {
		filename: '[name].js',
		path: resolve('dist'),
		publicPath: '/'
	}
}
