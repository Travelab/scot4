import glob from 'glob'
import open from 'open'
import chalk from 'chalk'
import autocomplete from 'inquirer-autocomplete-prompt'

import selectPort from './selectPort'
import startServer from './startServer'
import { packagesPath } from '../../path'
import { setShared } from '../../utils'
import { Base } from '../../yo-yo'
import { normalizePath } from '../../utils'

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

      const component = normalizePath(componentName, packagesPath)
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

	end () {
    setShared('linter', this.linter)
		setShared('component', this.component)

		startServer(null, this.port)
			.then((address) => open(address))
	}
}