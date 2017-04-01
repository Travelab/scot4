import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { entryHtmlPath } from '../../path'
import { babel, image, svg } from '../webpack-blocks'

import Dashboard from 'webpack-dashboard'
import DashboardPlugin from 'webpack-dashboard/plugin'

export default function({
	entryPointPath,
	outputPath,
	bundleName,
	rootComponentPath
}) {
	const include = path.resolve('./components')
	const exclude = path.resolve('./node_modules')

	const dashboard = new Dashboard()

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
			new DashboardPlugin(dashboard.setData)
		],
		module: {
			rules: [
				svg({ include, exclude }),
				babel({ include, exclude, isProduction: true }),
				image({ include, exclude })
			]
		},
		resolve: {
			modules: [ include, exclude ],
			alias: {
				'root-component': rootComponentPath
			},
			unsafeCache: true
		},
    performance: {
		  hints: false
    }
	}
}