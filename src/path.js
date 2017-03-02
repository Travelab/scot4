import path from 'path'

export const pkgBase = __dirname
export const cliBase = process.cwd()

export const nodeModulesPath = path.join(cliBase, 'node_modules')
export const packagesPath = path.join(cliBase, 'modules', 'node_modules')
export const buildPath = path.join(cliBase, 'build')

export const storybookPath							= path.join(pkgBase, 'storybook')
export const selectComponentsLoaderPath		= path.join(storybookPath, 'select-components-loader.js')

export const entryPath = path.join(packagesPath, 'entry')
export const entryHtmlPath = path.join(entryPath, 'index.html')
export const entryDirectPath = path.join(entryPath, 'direct.js')
export const entryStorybullPath = path.join(entryPath, 'storybull.js')

export default path