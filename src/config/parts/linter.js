import path, { packagesPath } from '../../path'
import { getShared } from '../../utils'

export default (
  {
    include
  } = {}
) => ({
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      include, exclude: /node_modules/,
      use: [{
        loader: 'eslint-loader',
        options: {
          configFile: require.resolve('eslint-config-tl3'),
          formatter: require('eslint-friendly-formatter'),
        }
      }]
    }]
  }
})
