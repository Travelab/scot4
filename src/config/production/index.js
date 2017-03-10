import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import DashboardPlugin from 'webpack-dashboard/plugin'
import { entryHtmlPath } from '../../path'
import {
	svg,
	babel,
	image,
	style
} from '../webpack-blocks'

// TODO: add default parms
export default function({ 
	entryPointPath,
	outputPath,
	bundleName,
	rootComponentPath
}) {
	const include = path.resolve('./packages')
	const exclude = path.resolve('./node_modules')

	console.log('Root path: ', rootComponentPath);
	return {
		entry: entryPointPath,
		output: {
			path: outputPath,
			filename: bundleName('js') 
		},
		plugins: [
			new HtmlWebpackPlugin({
				inject: true,
				template: entryHtmlPath
			}),
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false
			}),
			new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }), 
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					dead_code: true,
					drop_console: true
				}
			}),
			new ExtractTextPlugin(bundleName('css'))
		],
		module: {
			rules: [
				svg({ include, exclude }),
				babel({ include, exclude }),
				image({ include, exclude }),
				{
					test: /\.css$/, 
					include: include,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					})
				}
			]
		},
		resolve: {
			modules: [ include, exclude ],
			alias: {
				'root-component': rootComponentPath
			}
		}
	}
}