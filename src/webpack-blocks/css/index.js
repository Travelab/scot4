

export default (options = {}) => {

	let {
		test = /\.css$/,
		exclude,
		include
	} = options

	if (exclude && !Array.isArray(exclude)) exclude = [ exclude ]
	if (include && !Array.isArray(include)) include = [ include ]

	console.log({test});

	return (context) => ({
		module: {
			rules: [
				{
					test, include, exclude,
					use: [{
						loader: 'style-loader'
					}, {
						loader: 'css-loader'
					}]
				}
			]
		}
	})

}