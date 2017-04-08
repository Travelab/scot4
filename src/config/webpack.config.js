import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import {
	buildPath,
	modulesPath,
	packagesPath,
	entryHtmlPath,
	nodeModulesPath,
	entryDirectPath,
	entryStorybullPath,
} from '../path'

import svg from './parts/svg'
import hmr from './parts/hotModuleReloading'
import html from './parts/html'
import entry from './parts/entry'
import babel from './parts/babel'
import style from './parts/style'
import image from './parts/image'
import linter from './parts/linter'
import error from './parts/error'
import minimize from './parts/minimize'
import progress from './parts/progress'
import component from './parts/component'
import sourceMap from './parts/sourceMaps'

const includePath = [packagesPath, modulesPath]

const common = {
	plugins: [
		new webpack.NamedModulesPlugin(),
	],
	resolve: {
		modules: [nodeModulesPath, packagesPath, modulesPath],
		unsafeCache: true
	},
	performance: {
		hints: false
	}
}

export default (
	{
		componentPath,
		checkoutLinter
	} = {}
) => {
	const rootComponent = path.join(packagesPath, componentPath)

	const config = merge(
		sourceMap(),
		entry({
			build: entryDirectPath,
			dev: entryStorybullPath,
			rootComponent
		}),

		component({ include: includePath, componentPath }),
		babel({ include: includePath, basePath: buildPath }),
		style({ include: includePath }),
		image({ include: includePath }),
		svg({ include: includePath }),
		html({ templatePath: entryHtmlPath }),
		checkoutLinter && linter({ include: rootComponent }),

		minimize(),
		progress(),
		hmr(),
		error(),
		common
	)

	return config
}