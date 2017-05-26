import path from 'path'
import { ifProd } from './utils'

export default ({ include, basePath = '' }) => ({
  output: {
    path: basePath,
    filename: `[name]${ifProd('.[chunkhash]', '.bundle')}.js`,
    chunkFilename: `[name]${ifProd('.[chunkhash]', '.bundle')}.js`,
    publicPath: ifProd('', '/static/')
  },
  module: {
    rules: [
      {
        include,
        exclude: /node_modules/,
        test: /\.jsx?/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              presets: [
                [
                  require.resolve('babel-preset-env'),
                  {
                    targets: {
                      ie: 9
                    },
                    modules: false
                  }
                ],
                require.resolve('babel-preset-react')
              ],
              plugins: [
                require.resolve('babel-plugin-transform-class-properties'),
                require.resolve('babel-plugin-transform-object-rest-spread'),
                require.resolve('babel-plugin-transform-async-to-bluebird'),
                require.resolve('babel-plugin-transform-promise-to-bluebird'),
                [
                  require.resolve('babel-plugin-lodash'),
                  {
                    id: ['lodash', 'recompose']
                  }
                ],
                require.resolve('babel-plugin-react-require'),
                [
                  require.resolve('babel-plugin-transform-runtime'),
                  {
                    helpers: false,
                    polyfill: false,
                    regenerator: true,
                    moduleName: path.dirname(
                      require.resolve('babel-runtime/package')
                    )
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
})
