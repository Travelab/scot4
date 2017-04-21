import { ifProd } from './utils'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default () => ifProd(
  {
    module: {
      rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
    ]
  },
  {
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
  }
)