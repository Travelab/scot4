import path from 'path'
import chalk from 'chalk'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { entryHtmlPath, modulesPath } from '../../path'
import { babel, image, svg } from '../webpack-blocks'

import ProgressBarPlugin from 'progress-bar-webpack-plugin'

export default function({
	entryPointPath,
	outputPath,
	bundleName,
	rootComponentPath
}) {
	const include = path.resolve('./components')
	const exclude = path.resolve('./node_modules')

  process.traceDeprecation = true

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
      new ProgressBarPlugin({
        format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false
      })
		],
		module: {
			rules: [
				svg({ include: [include, modulesPath], exclude }),
				babel({ include: [include, modulesPath], exclude, isProduction: true }),
				image({ include: [include, modulesPath], exclude })
			]
		},
		resolve: {
			modules: [ include, exclude, modulesPath ],
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