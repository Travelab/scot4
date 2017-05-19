import { ifProd } from './utils'
import Copy from 'copy-webpack-plugin'

export default (
	{ 
		from,
		to
	} = {}
) => ifProd({
	plugins: [
		new Copy([ { from, to, flatten: true } ])
	]
}, {})
