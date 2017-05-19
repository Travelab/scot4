import fs from 'fs'
import glob from 'glob'
import chalk from 'chalk'
import rimraf from 'rimraf'
import webpack from 'webpack'
import loadConfig from '../../config/webpack.config.js'
import { buildPath, packagesPath, defaultCIConfig } from '../../path'
import { normalizePath } from '../../utils'

const logger = console.log
export default (componentName) => {
	const availableComponents = glob.sync('@*/*', { cwd: packagesPath })

  if ( componentName === undefined ) {
    if ( fs.existsSync(defaultCIConfig) ) {
      componentName = fs.readFileSync(defaultCIConfig, 'utf-8')
      if ( componentName === '' ) {
        logger(chalk.red(`Default file empty. Set default component path`))
        return
      }
    } else {
      logger(chalk.red(`Default file not found. Create .ci-cofig`))
      return
    }
  }

  const component = normalizePath(componentName, packagesPath)
  if (!availableComponents.includes(component)) {
    logger(chalk.red(`Component ${component} not found in ${packagesPath}`))
    return
  }

  const {
    config,
    templatePath
  } = loadConfig({
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
