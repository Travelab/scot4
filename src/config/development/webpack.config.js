import path from 'path'
import webpack from 'webpack'
import { getShared } from '../../utils'
import { babel, component, image, style, svg, linter } from '../webpack-blocks'
import { entryPath, entryStorybullPath, nodeModulesPath, packagesPath } from '../../path'

import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'

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

			new FriendlyErrorsWebpackPlugin({
        clearConsole: true
			})
		],
		module: {
			rules: [
				babel({ include, exclude, isProduction: false }),
				style(),
				image({ include, exclude }),
				svg({ include, exclude }),
				component({ entryPath, exclude })
			],
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

	return storybookBaseConfig
}