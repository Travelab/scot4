import path from 'path'

export const pkgBase = __dirname
export const cliBase = process.cwd()

export const nodeModulesPath = path.join(cliBase, 'node_modules')
export const packagesPath = path.join(cliBase, 'packages')
export const buildPath = path.join(cliBase, 'build')
export const dllPath = path.join(cliBase, '__vendor')

export const storybookPath	= path.join(pkgBase, 'config', 'development')

export const entryPath = path.join(packagesPath, 'entry')
export const entryHtmlPath = path.join(entryPath, 'index.html')
export const entryDirectPath = path.join(entryPath, 'direct.js')
export const entryStorybullPath = path.join(entryPath, 'storybull.js')

export default path