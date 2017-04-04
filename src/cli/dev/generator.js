import glob from 'glob'
import open from 'open'
import chalk from 'chalk'
import autocomplete from 'inquirer-autocomplete-prompt'

import selectPort from './selectPort'
import startServer from './startServer'
import path, { packagesPath } from '../../path'
import { setShared } from '../../utils'
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

	prompting () {

    const availableComponents = glob
			.sync(`${packagesPath}/@*/*/`, { cwd: packagesPath, })
		  .map((folder) => folder.replace(`${packagesPath}${path.sep}`, ''))

    console.log('File Path: ', availableComponents)

		let { componentName } = this.options
    if ( componentName ) {
		  const { doLinter } = this.options

      const component = normalizePath(componentName, packagesPath)
      console.log('Normalize Path: ', component)

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
    setShared('linter', this.linter)
		setShared('component', this.component)

		startServer(null, this.port)
			.then((address) => open(address))
	}
}