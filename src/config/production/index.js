import path from 'path'
import chalk from 'chalk'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
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

	return {
		devtool: 'source-map',
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
				},
				sourceMap: true
			}),
			new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
      new ExtractTextPlugin(bundleName('css')),
      new ProgressBarPlugin({
        format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false
      })
		],
		module: {
			rules: [
				svg({ include: [include, modulesPath], exclude }),
				babel({ include: [include, modulesPath], exclude }),
				image({ include: [include, modulesPath], exclude }),
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