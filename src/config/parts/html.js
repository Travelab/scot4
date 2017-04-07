import HtmlWebpackPlugin from 'html-webpack-plugin'
import {ifProd} from './utils'

export default (
	{
		title = 'React Workbench',
		templatePath = ''
	} = {}
) => ifProd({
	plugins: [
		new HtmlWebpackPlugin({
			title,
			inject: true,
			template: templatePath
		})
	]
}, null)