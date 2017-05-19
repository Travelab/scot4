import { ifProd } from './utils'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'

export default (
	{ 
	} = {}
) => ifProd({}, {
	plugins: [
		new FriendlyErrorsWebpackPlugin(),
	]
})
