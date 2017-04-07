import webpack from 'webpack'
import {ifProd} from './utils'

// TODO: add entry for react-hot-loader
export default (
	{
		entry,
	} = {}
) => ifProd(
	null,
	{
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
		]
	}
)
