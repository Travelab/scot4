

export default (options = {}) => {

	let {
		test = /\.css$/,
		exclude,
		include
	} = options

	if (exclude && !Array.isArray(exclude)) exclude = [ exclude ]
	if (include && !Array.isArray(include)) include = [ include ]

	return (context) => ({
		module: {
			loaders: [
				{
					test, include, exclude,
					loader: 'style-loader!css-loader'
				}
			]
		}
	})

}