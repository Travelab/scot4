

export default (options = {}) => {

	let {
		test = /\.(gif|ico|jpe?g|png)$/,
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
						loader: 'file-loader',
						query: {
							name: '[path][name].[ext]?[hash:4]'
						}
					}]
				}
			]
		}
	})

}