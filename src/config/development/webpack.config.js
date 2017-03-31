import path from 'path'
import webpack from 'webpack'
import { getShared } from '../../utils'
import { babel, component, image, style, svg, linter } from '../webpack-blocks'
import { dllPath, entryPath, entryStorybullPath, nodeModulesPath, packagesPath } from '../../path'

export default function (storybookBaseConfig) {
	const exclude = path.resolve('./node_modules')
	const include = path.resolve('./components')

	const doLinter = getShared('linter')

	storybookBaseConfig = {
		...storybookBaseConfig,
		devtool: 'eval',
		plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
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

	if ( doLinter ) {
	  const component = getShared('component')
	  storybookBaseConfig.module.rules.push(
	    linter({
		    exclude,
		    include: path.join(packagesPath, component),
		    config: require('eslint-config-tl3')
	    })
	  )
	}

	// Return the altered config
	return storybookBaseConfig
}