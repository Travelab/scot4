import webpack from 'webpack'
import AutoDllPlugin from 'autodll-webpack-plugin'
import { ifProd } from './utils'

export default ({ context, path }) => ({
  plugins: [
    new AutoDllPlugin({
      context,
      path,
      inject: true,
      filename: '[name]--[hash].js',
      entry: {
        vendor: [ 'lodash' ],
        utils: [
          'react',
          'redux',
          'react-dom',
          'recompose'
        ]
      },
      plugins: ifProd([
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
            dead_code: true,
            drop_console: true
          },
          sourceMap: false
        })
      ])
    })
  ]
})
