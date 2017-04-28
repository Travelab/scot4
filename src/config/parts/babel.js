import path from 'path'
import { ifProd } from './utils'

export default (
	{
		include,
		basePath = ''
  }
) => ({
	output: {
		path: basePath,
		filename: `[name]${ifProd('.[chunkhash]', '.bundle')}.js`,
		chunkFilename: `[name]${ifProd('.[chunkhash]', '.bundle')}.js`,
		publicPath: ifProd('', '/static/')
	},
	module: {
		rules: [{
			include,
			exclude: /node_modules/,
			test: /\.jsx?/,
			use: [{
				loader: 'babel-loader',
				options: {
					babelrc: false,
					cacheDirectory: true,
					presets: [
						[require.resolve('babel-preset-env'), {
							targets: {
								ie: 9,
								uglify: true,
							},
							loose: true,
							useBuiltIns: true,
							modules: false
						}],
						require.resolve('babel-preset-react'),
						require.resolve('babel-preset-bluebird')
					],
					plugins: [
						require.resolve('babel-plugin-prejss'),
						require.resolve('babel-plugin-transform-class-properties'),
						[require.resolve('babel-plugin-transform-object-rest-spread'), {
							useBuiltIns: true
						}],
						[require.resolve('babel-plugin-lodash'), {
							id: ['lodash', 'recompose']
						}],
						require.resolve('babel-plugin-react-require'),
						[require.resolve('babel-plugin-transform-runtime'), {
							helpers: true,
							polyfill: true,
							regenerator: true,
							moduleName: path.dirname(require.resolve('babel-runtime/package'))
						}]
					]
				}
			}]
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
})
