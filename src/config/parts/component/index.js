export default ({ include, componentPath } = {}) => ({
  module: {
    rules: [
      {
        test: /storybull\.js$/,
        include,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('./component-loader'),
            options: {
              component: componentPath
            }
          }
        ]
      }
    ]
  }
})
