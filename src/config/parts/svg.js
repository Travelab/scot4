export default (
	{ 
		include
	} = {}
) => ({
	module: {
    rules: [{
      test: /\.svg$/,
      include, exclude: /node_modules/,
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
    }]
  }
})
