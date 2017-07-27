import path from 'path'

export const pkgBase = __dirname
export const cliBase = process.cwd()

export const nodeModulesPath = path.join(cliBase, 'node_modules')
export const modulesPath = path.join(cliBase, 'modules')
export const packagesPath = path.join(cliBase, 'components')
export const buildPath = path.join(cliBase, 'build')

export const dllPath = path.join(cliBase, 'dll')

export const defaultCIConfig = path.join(cliBase, '.ci-config')

export const entryPath = path.join(packagesPath, 'entry')
export const entryHtmlPath = path.join(entryPath, 'index.html')
export const entryDirectPath = path.join(entryPath, 'direct.js')
export const entryStorybullPath = path.join(entryPath, 'storybull.js')

export const buildFavicon = 'favicons'
export const entryFaviconPath = path.join(entryPath, 'favicons')

export default path
