import { ifProd } from './utils'

export default (
  { development = 'cheap-module-source-map', production = 'source-map' } = {}
) => ({ devtool: ifProd(production, development) })
