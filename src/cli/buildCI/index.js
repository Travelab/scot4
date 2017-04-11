import path from 'path'
import glob from 'glob'
import chalk from 'chalk'
import rimraf from 'rimraf'
import webpack from 'webpack'
import loadConfig from '../../config/webpack.config.js'
import { buildPath, packagesPath } from '../../path'
import { setShared, normalizePath } from '../../utils'

const logger = console.log
export default (componentName) => {
	const availableComponents = glob.sync('@*/*', { cwd: packagesPath })

	const component = normalizePath(componentName, packagesPath)
	if (!availableComponents.includes(component)) {
		logger(chalk.red(`Component ${componentName} not found in ${packagesPath}`))
		return
	}

  const config = loadConfig({
    componentPath: component,
    checkoutLinter: false
  })
  const compiler = webpack(config)

  const remove = Promise.promisify(rimraf)
  const build = Promise.promisify(compiler.run, { context: compiler })

  return remove(buildPath)
    .then(() => build())
   	// TODO: add more info
    .then(() => logger(chalk.yellow.bold(`All done. Build create! ;)\n`)))
    .catch((err) => logger(chalk.red(err)))
}