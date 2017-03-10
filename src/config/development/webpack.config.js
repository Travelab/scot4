import path from 'path'
import webpack from 'webpack'
import {
	svg,
	babel,
	style,
	image,
	component
} from '../webpack-blocks'
import {
	entryPath,
 	entryStorybullPath
} from '../../path'

export default function (storybookBaseConfig, configType) {
	const exclude = path.resolve('./node_modules')
	const include = path.resolve('./packages')

	storybookBaseConfig = {
		...storybookBaseConfig,
		plugins: [
			new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }), 
    	new webpack.HotModuleReplacementPlugin(), 
    	new webpack.NamedModulesPlugin()
		],
		module: {
			rules: [
				svg({ include, exclude }),
				babel({ include, exclude }),
				style({ include }),
				image({ include, exclude }),
				component({ entryPath, exclude })
			]
		},
		resolve: {
			...storybookBaseConfig.resolve, 
			alias: {
				...storybookBaseConfig.resolve.alias,
				'entry-storybull': require.resolve(entryStorybullPath)
			}
		},
		performance: {
			hints: false
		}
	}

	// Return the altered config
	return storybookBaseConfig
}