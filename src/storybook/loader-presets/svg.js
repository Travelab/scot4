import { packagesPath } from '../../path'

const test = /\.svg$/
const include = [ packagesPath ]
const exclude = []

export default [
	{
		test, include, exclude,
		loader: 'svg-url',
		query: {
			limit: 1024,
			noquotes: true,

			// Parameters for the file-loader are valid too
			// They are passed to the file-loader if used
			name: '[path][name].[ext]?[hash:4]'
		}
	},
	{
		test, include, exclude,
		loader: 'image-webpack'
		// https://github.com/tcoopman/image-webpack-loader
		// https://github.com/svg/svgo#what-it-can-do
	}
]