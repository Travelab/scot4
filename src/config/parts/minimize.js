import webpack from 'webpack'
import ArchivePlugin from 'webpack-archive-plugin'
import { ifProd } from './utils'
import { buildPath } from '../../path'

export default () =>
  ifProd(
    {
      plugins: [
        new webpack.EnvironmentPlugin({
          NODE_ENV: 'production'
        }),
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
        }),
        new ArchivePlugin({
          output: `${buildPath}/build`,
          format: 'tar',
          ext: 'tar.gz'
        })
      ]
    },
    {
      plugins: [
        new webpack.EnvironmentPlugin({
          NODE_ENV: 'development'
        })
      ]
    }
  )
