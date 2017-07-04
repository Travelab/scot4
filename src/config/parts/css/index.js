import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import { ifProd } from '../utils'
import browserslist from '../../browserslist.js'


const useOfCSS = [
	{
		loader: require.resolve('css-loader')
	}
]

const useOfJSS = [
	{
		loader: require.resolve('css-loader'),
		options: {
			url: false,
			import: false,
			modules: true,
			localIdentName: ifProd('[hash:base64:8]', '[path][name]__[local]--[hash:base64:5]'),
			sourceMap: true,
			// 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
			importLoaders: 5,
			// Dashes in class names will be camelized, the original class name will be removed from the locals
			camelCase: 'dashesOnly',
		}
	},
	{
		loader: require.resolve('postcss-loader'),
		options: {
			sourceMap: true,
			plugins: (loader) => [
				autoprefixer({ browsers: browserslist }),
			]
		}
	},
	require.resolve('./jss-loader/index.js'),
	require.resolve('raw-loader'),
	{
		loader: require.resolve('value-loader'),
		options: {
			name: 'default',
		}
	},

	// А вот это я не стал оборачивать в require.resolve чтобы потестить на машинах коллег работоспособность
	{
		loader: 'babel-loader',
		options: {
			babelrc: false,
			cacheDirectory: true,
			presets: [
				['env', {
					targets: {
						node: true,
					},
					modules: false,
				}]
			],
			plugins: [
				'lodash',
				'transform-class-properties',
				'transform-object-rest-spread',
			]
		}
	}
]

const extractCSS = new ExtractTextPlugin({
	filename: '[name].[chunkhash].css',
	ignoreOrder: true,
	disable: false,
})

const styleLoader = require.resolve('style-loader')

const wrapUse = (use) => (
	ifProd(
		extractCSS.extract({ fallback: styleLoader, use: use }),
		[ styleLoader ].concat(use)
	)
)

export default ({ include }) => ({
	module: {
		rules: [
			{
				test: /\.js$/,
				include: /styles/,
				exclude: /node_modules/,
				use: wrapUse(useOfJSS)
			},
			{
				test: /\.css$/,
				include,
				use: wrapUse(useOfCSS)
			}
		]
	},
	plugins: ifProd([ extractCSS ], undefined)
})
