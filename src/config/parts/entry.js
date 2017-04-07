import { ifProd } from './utils'

export default (
	{ 
    build,
    dev,
    rootComponent
	} = {}
) => ifProd({
  entry: {
    bundle: build
  },
  resolve: {
    alias: {
      'root-component': rootComponent
    }
  }
 }, {
  entry: {
    preview: [require.resolve(dev)],
  }
})