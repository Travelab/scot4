export default function(options = {}) {
	let {
		test = /\.css$/,
		exclude,
		include
	} = options

	if (exclude && !Array.isArray(exclude)) exclude = [ exclude ]
	if (include && !Array.isArray(include)) include = [ include ]

	return {
		test, include, exclude,
		use: [{
			loader: 'style-loader'
		}, {
			loader: 'css-loader?importLoaders=1'
		}]
	}
}