

export default (options = {}) => {

	let {
		test = /\.css$/,
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
					loader: 'style-loader',
				},
				{
					test, include, exclude,
					loader: 'css-loader',
				}
			]
		}
	})

}