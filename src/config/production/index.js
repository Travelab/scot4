import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { entryHtmlPath } from '../../path'
import { babel, image, svg } from '../webpack-blocks'

export default function({
	entryPointPath,
	outputPath,
	bundleName,
	rootComponentPath
}) {
	const include = path.resolve('./packages')
	const exclude = path.resolve('./node_modules')

	return {
		entry: {
			bundle: entryPointPath,
		},
		output: {
			path: outputPath,
			filename: bundleName('js') 
		},
		plugins: [
			new HtmlWebpackPlugin({
				inject: true,
				template: entryHtmlPath
			}),
    	new webpack.NamedModulesPlugin(),
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					dead_code: true,
					drop_console: true
				}
			}),
			new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }), 
			new webpack.IgnorePlugin(/^\.\/locale$/, /timezone$/),
			new ExtractTextPlugin(bundleName('css'))
		],
		module: {
			rules: [
				svg({ include, exclude }),
				babel({ include, exclude, isProduction: true }),
				image({ include, exclude }),
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader?importLoaders=1'
					})
				}
			]
		},
		resolve: {
			modules: [ include, exclude ],
			alias: {
				'root-component': rootComponentPath
			},
			unsafeCache: true
		},
	}
}