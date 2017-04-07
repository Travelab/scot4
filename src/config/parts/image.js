export default (
	{ 
		include
	} = {}
) => ({
	module: {
    rules: [{
      test: /\.(gif|ico|jpe?g|png)$/,
      include, exclude: /node_modules/,
      use: [{
        loader: 'file-loader',
        query: {
          name: '[path][name].[ext]?[hash:4]'
        }
      }]
    }]
  }
})
