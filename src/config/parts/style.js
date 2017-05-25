import { ifProd } from './utils'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default ({ include }) => ifProd(
  {
    module: {
      rules: [
        {
          test: /\.css$/, include,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader?importLoaders=1'
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css'),
    ],
  },
  {
    module: {
      rules: [
        {
          test: /\.css$/, include,
          use: [{
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
          }]
        }
      ]
    }
  }
)
