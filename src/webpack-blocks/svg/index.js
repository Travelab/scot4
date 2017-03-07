

export default (options = {}) => {

	let {
		test = /\.svg$/,
		exclude = /\/node_modules\//,
		include
	} = options

	if (exclude && !Array.isArray(exclude)) exclude = [ exclude ]
	if (include && !Array.isArray(include)) include = [ include ]

	return (context) => ({
		module: {
			rules: [
				{
					test, include, exclude,
					use: [{
						loader: 'svg-url-loader',
						query: {
							limit: 1024,
							noquotes: true,

							// Parameters for the file-loader are valid too
							// They are passed to the file-loader if used
							name: '[path][name].[ext]?[hash:4]'
						}
					}]
				},
				{
					test, include, exclude,
					use: [{loader: 'image-webpack-loader'}]
					// https://github.com/tcoopman/image-webpack-loader
					// https://github.com/svg/svgo#what-it-can-do
				}
			]
		}
	})

}