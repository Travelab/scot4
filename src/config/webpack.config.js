import fs from 'fs'
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
		checkoutLinter,
		checkoutStorybook
	} = {}
) => {
	const rootComponent = path.join(packagesPath, componentPath)

	let templatePath = (process.env.NODE_ENV === 'production') ? entryHtmlPath : ''
	const entryHTML = path.join(rootComponent, 'entry', 'index.html')
	if ( fs.existsSync(entryHTML) ) {
	  templatePath = entryHTML
	}

	const config = merge(
		sourceMap(),
    entry({ rootComponent, checkoutStorybook }),

		babel({ include: includePath, basePath: buildPath }),
		style({ include: includePath }),
		image({ include: includePath }),
		svg({ include: includePath }),
		html({ template: templatePath }),
		
		checkoutLinter && linter({ include: rootComponent }),
		checkoutStorybook && component({ include: includePath, componentPath }),

		minimize(),
		progress(),
		hmr(),
		error(),
		common
	)

	return {config, templatePath}
}