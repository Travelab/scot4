export default function(options = {}) {
	let {
		test = /\.svg$/,
		exclude,
		include
	} = options

	if (exclude && !Array.isArray(exclude)) exclude = [ exclude ]
	if (include && !Array.isArray(include)) include = [ include ]

	return {
		test, include, exclude,
		use: [{
			loader: 'svg-url-loader',
			query: {
				limit: 1024,
				noquotes: true,
				name: '[path][[sha512:hash:base64:7].[ext]'
			}
		}, {
      loader: 'image-webpack-loader',
      query: {
        bypassOnDebug: false
      }
		}]
	}
}