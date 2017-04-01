import path from 'path'
import glob from 'glob'
import open from 'open'
import chalk from 'chalk'
import rimraf from 'rimraf'
import autocomplete from 'inquirer-autocomplete-prompt'
import webpack from 'webpack'

import loadConfig from '../../config/production'
import selectPort from './selectPort'
import startServer from './startServer'
import { buildPath, entryDirectPath, packagesPath } from '../../path'
import { Base } from '../../yo-yo'
import { normalizePath } from '../../utils'

export default class extends Base {

  constructor (args, opts) {
    super(args, opts)

    this.env.adapter.promptModule.registerPrompt('autocomplete', autocomplete)
  }

  _promptComponent(availableComponents) {
    const choicesComponents = availableComponents.map((component) => {
      const [ folder, name ] = component.split('/')

      return {
        name: `${name} ${chalk.gray(folder)}`,
        short: name,
        value: component
      }
    })

    const chooser = (answers, input) => Promise.resolve(
      input
        ? choicesComponents.filter((c) => ~c.name.indexOf(input))
        : choicesComponents
    )

    const prompts = [
      {
        type: 'autocomplete',
        name: 'component',
        message: `Which ${chalk.yellow('component')} do you want to dev?`,
        validate: (component) => (!!~availableComponents.indexOf(component)),
        source: chooser,
        when: () => (!this.component)
      },
      {
        type: 'confirm',
        name: 'needTestServer',
        message: 'Do you need to run server for manual testing?',
        store: true
      }
    ]

    return this
      .prompt(prompts)
      .then((answers) => {
        this.component = answers.component
        this.needTestServer = answers.needTestServer
      })
  }

  prompting () {

    const components = this.getConfig('components')
		const availableComponents = glob
			.sync(`+(${components.join('|')})/*/`, { cwd: packagesPath })
			.map((name) => name.slice(0, -1))

		let { componentName } = this.options
    if ( componentName ) {
		  const { needTestServer } = this.options

      const component = normalizePath(componentName, packagesPath)
      if (!availableComponents.includes(component)) {
        this.log(chalk.red(`Component ${componentName} not found in ${packagesPath}`))
        return this._promptComponent(availableComponents)
      }

      this.component = component
      this.needTestServer = needTestServer
      return
    }
    return this._promptComponent(availableComponents)
  }

  configuring () {

    const entryPointPath = entryDirectPath
    const bundleName = (ext) => (`[name].[chunkhash].${ext}`)
    const outputPath = buildPath
    const rootComponentPath = path.join(packagesPath, this.component, 'index.js')

    this.webpackConfig = loadConfig({
      entryPointPath,
      outputPath,
      bundleName,
      rootComponentPath
    })
  }

  end () {
    const compiler = webpack(this.webpackConfig)

    const remove = Promise.promisify(rimraf)
    const build = Promise.promisify(compiler.run, {context: compiler})

    return remove(buildPath)
      .then(() => build())
      .then(() => {

        if (this.needTestServer) {

          return selectPort()
            .then((port) => startServer(null, port))
            .then((address) => open(address))
        }
      })
      .catch((err) => {
        this.log(chalk.red(err))
      })
  }
}
