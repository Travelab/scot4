import glob from 'glob'
import open from 'open'
import chalk from 'chalk'
import autocomplete from 'inquirer-autocomplete-prompt'

import loadConfig from '../../config/webpack.config.js'
import selectPort from './selectPort'
import startServer from './startServer'
import path, { packagesPath } from '../../path'
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
        ? choicesComponents.filter((c) => ~c.value.indexOf(input))
        : choicesComponents
    )

    const prompts = [
      {
        type: 'autocomplete',
        name: 'component',
        message: `Which ${chalk.yellow('component')} do you want to dev?`,
        source: chooser,
      },
      {
        type: 'confirm',
        name: 'doLinter',
        message: `Do you need use eslint for find errors?`,
        default: false
      }
    ]

    return Promise
      .all([
        selectPort(),
        this.prompt(prompts)
      ])
      .then(([ port, answers ]) => {

        this.port = port
        this.linter = answers.doLinter

        if (!this.component) this.component = answers.component
      })
  }

	prompting () {

    const availableComponents = glob.sync('@*/*', { cwd: packagesPath })

		let { componentName } = this.options
    if ( componentName ) {
		  const { doLinter } = this.options

      const component = normalizePath(componentName, packagesPath)

      if (!availableComponents.includes(component)) {
		    this.log(chalk.red(`Component ${component} not found in ${packagesPath}`))
        return this._promptComponent(availableComponents)
      }

      this.component = component
      this.linter = doLinter
      return selectPort().then((port) => this.port = port)
    }

    return this._promptComponent(availableComponents)
	}

	end () {
    const config = loadConfig({
      componentPath: this.component,
      checkoutLinter: this.linter
    })

		startServer({
      port: this.port,
      webpackConfig: config
    }).then((address) => open(address))
	}
}