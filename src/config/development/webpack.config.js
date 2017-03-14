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
 	entryStorybullPath,
 	packagesPath,
 	nodeModulesPath
} from '../../path'

export default function (storybookBaseConfig, configType) {
	const exclude = path.resolve('./node_modules')
	const include = path.resolve('./packages')

	storybookBaseConfig = {
		...storybookBaseConfig,
		plugins: [
			new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }), 
    	new webpack.HotModuleReplacementPlugin(),
    	new webpack.NamedModulesPlugin(),
		],
		module: {
			rules: [
				babel({ include, exclude, isProduction: false }),
				style(),
				image({ include, exclude }),
				svg({ include, exclude }),
				component({ entryPath, exclude })
			]
		},
		resolve: {
			...storybookBaseConfig.resolve, 
			modules: [nodeModulesPath, packagesPath],
			alias: {
				...storybookBaseConfig.resolve.alias,
				'entry-storybull': require.resolve(entryStorybullPath)
			},
			unsafeCache: true
		},
		performance: {
			hints: false
		}
	}

	// Return the altered config
	return storybookBaseConfig
}