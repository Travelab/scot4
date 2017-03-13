import path from 'path'
import webpack from 'webpack'
import { babel, component, image, style, svg } from '../webpack-blocks'
import { dllPath, entryPath, entryStorybullPath, nodeModulesPath, packagesPath } from '../../path'

export default function (storybookBaseConfig, configType) {
	const exclude = path.resolve('./node_modules')
	const include = path.resolve('./packages')

	storybookBaseConfig = {
		...storybookBaseConfig,
		devtool: 'eval',
		plugins: [
			new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }), 
    	new webpack.HotModuleReplacementPlugin(),
    	new webpack.NamedModulesPlugin(),
    	new webpack.DllReferencePlugin({
    		context: storybookBaseConfig.output.path,
    		manifest: require(path.join(dllPath, 'storybook-manifest.json'))
    	}),
    	new webpack.DllReferencePlugin({
    		context: storybookBaseConfig.output.path,
    		manifest: require(path.join(dllPath, 'vendor-manifest.json'))
    	})
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