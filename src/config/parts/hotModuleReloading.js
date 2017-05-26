import webpack from 'webpack'
import { ifProd } from './utils'

export default ({ entry } = {}) =>
  ifProd(null, {
    plugins: [new webpack.HotModuleReplacementPlugin()]
  })
