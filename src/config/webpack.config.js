import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import {
  buildPath,
  modulesPath,
  packagesPath,
  buildFavicon,
  entryHtmlPath,
  nodeModulesPath,
  entryFaviconPath
} from '../path'

import svg from './parts/svg'
import hmr from './parts/hotModuleReloading'
import html from './parts/html'
import entry from './parts/entry'
import babel from './parts/babel'
import css from './parts/css'
import image from './parts/image'
import favicon from './parts/favicon'
import linter from './parts/linter'
import error from './parts/error'
import minimize from './parts/minimize'
import progress from './parts/progress'
import component from './parts/component'
import sourceMap from './parts/sourceMaps'

const includePath = [packagesPath, modulesPath]

const common = {
  plugins: [new webpack.NamedModulesPlugin()],
  resolve: {
    modules: [nodeModulesPath, packagesPath, modulesPath],
    unsafeCache: true
  },
  performance: {
    hints: false
  }
}

export default ({ componentPath, checkoutLinter, checkoutStorybook } = {}) => {
  const rootComponent = path.join(packagesPath, componentPath)

  let templatePath = process.env.NODE_ENV === 'production' ? entryHtmlPath : ''
  const entryHTML = path.join(rootComponent, 'entry', 'index.html')
  if (fs.existsSync(entryHTML)) {
    templatePath = entryHTML
  }

  const config = merge(
    sourceMap(),
    entry({ rootComponent, checkoutStorybook }),

    // Порядок имеет значение (начало)
    babel({ include: includePath, basePath: buildPath }),
    css({ include: [ nodeModulesPath, ...includePath ] }),
    // Порядок имеет значение (конец)

    image({ include: includePath }),
    svg({ include: includePath }),
    html({ template: templatePath }),
    checkoutLinter && linter({ include: rootComponent }),
    checkoutStorybook && component({ include: includePath, componentPath }),
    favicon({ from: `${entryFaviconPath}/*`, to: buildFavicon }),
    minimize(),
    progress(),
    hmr(),
    error(),
    common
  )

  return { config, templatePath }
}
