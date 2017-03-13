import path from 'path'
import webpack from 'webpack'

export default function(outputPath) {
	return {
		entry: {
			vendor: [
				'timezone',
				'lodash',
				'react',
				'redux',
				'react-dom',
				'react-redux'
			],
			storybook: [
				'@kadira/storybook-ui',
				'@kadira/storybook-addons',
				'@kadira/storybook-addons-links',
				'@kadira/storybook-addons-actions'
			]
		},
		output: {
			path: outputPath,
			filename: '[name].dll.js',
			library: '[name]_dll'
		},
		plugins: [
			new webpack.DllPlugin({
				path: path.join(outputPath, '[name]-manifest.json'),
				name: '[name]_dll'
			}),
			new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }})
		]
	}
}