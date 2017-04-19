import webpack from 'webpack'
import ArchivePlugin from 'webpack-archive-plugin'
import {ifProd} from './utils'

export default () => ifProd({
	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'production',
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true,
				warnings: false,
				dead_code: true,
				drop_console: true
			},
			mangle: {
				screw_ie8: true,
			},
			output: {
				comments: false,
				screw_ie8: true,
			},
			sourceMap: false
		}),

		new ArchivePlugin({
			output: 'build/build',
			format: 'tar',
		})
	]
}, {
	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development',
		}),
	]
})