import fs from 'fs'
import path from 'path'
import glob from 'glob'
import open from 'open'
import chalk from 'chalk'
import autocomplete from 'inquirer-autocomplete-prompt'
import webpack from 'webpack'

import selectPort from './selectPort'
import startServer from './startServer'
import loadConfig from '../../config/dll'
import { dllPath, packagesPath } from '../../path'
import { setShared } from '../../utils'
import { Base } from '../../yo-yo'

const logger = console.log
export default class extends Base {

	constructor (args, opts) {
		super(args, opts)

    this.env.adapter.promptModule.registerPrompt('autocomplete', autocomplete)
  }

	prompting () {

		const components = this.getConfig('components')
		const availableComponents = glob
			.sync(`+(${components.join('|')})/*/`, { cwd: packagesPath })
			.map((name) => name.slice(0, -1))

		let { componentName } = this.options
    if ( componentName ) {
		  const { doLinter } = this.options

      const normalizePath = (component) => {
        let componentPath = component.toString()

        // replace components path
        componentPath = componentPath.replace(`${path.basename(packagesPath)}${path.sep}`, '')

        // remove delimiter
        if (componentPath.endsWith(path.sep)) {
          componentPath = componentPath.slice(0, -1)
        }

        // add @ to starts
        if (!componentPath.startsWith('@')) {
          componentPath = '@' + componentPath
        }

        return componentPath
      }

      const component = normalizePath(componentName)
      if (!availableComponents.includes(component)) {
        throw new Error(`Component ${componentName} not found in ${packagesPath}`)
      }

      this.component = component
      this.linter = doLinter
      return selectPort().then((port) => this.port = port)
    }

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
        name: 'doLinter',
        message: `Do you want use eslint?`,
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

	generating() {
		if (!fs.existsSync(dllPath)) {
			const compiler = webpack(loadConfig(dllPath))
			logger('=> Create dll manifest')
      return Promise.promisify(compiler.run, { context: compiler })()
	      .then(() => logger('=> Dll manifest created'))
		}
	}

	end () {
    setShared('linter', this.linter)
		setShared('component', this.component)

		startServer(null, this.port)
			.then((address) => open(address))
	}
}