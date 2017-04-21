export default () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }]
      }
    ]
  }
})