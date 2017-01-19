

export default (options = {}) => {

	let {
		test = /\.(gif|ico|jpe?g|png)$/,
		exclude = /\/node_modules\//,
		include
	} = options

	if (!Array.isArray(exclude)) exclude = [ exclude ]
	if (!Array.isArray(include)) include = [ include ]

	return (context) => ({
		module: {
			loaders: [
				{
					test, include, exclude,
					loader: 'file-loader',
					query: {
						name: '[path][name].[ext]?[hash:4]'
					}
				},
				/*{
					test, include, exclude,
					loader: 'image-webpack-loader'
					// https://github.com/tcoopman/image-webpack-loader
					// https://github.com/svg/svgo#what-it-can-do
				}*/
			]
		}
	})

}