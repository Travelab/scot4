/**
 * Created by menscrem on 01.04.17.
 */
import path from 'path'
import glob from 'glob'
import chalk from 'chalk'
import autocomplete from 'inquirer-autocomplete-prompt'

import { nodeModulesPath, packagesPath } from '../../path'
import { Base } from '../../yo-yo'
import { normalizePath } from '../../utils'
import {exec} from 'shelljs'
import {execute} from 'eslint-nibble'

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
      }
    ]

    return this
      .prompt(prompts)
      .then((answers) => {
        this.component = answers.component
      })
  }

  prompting () {
    const availableComponents = glob.sync('@*/*', { cwd: packagesPath })

    let { componentName } = this.options
    if ( componentName ) {
      const component = normalizePath(componentName, packagesPath)
      if (!availableComponents.includes(component)) {
        this.log(chalk.red(`Component ${componentName} not found in ${packagesPath}`))
        return this._promptComponent(availableComponents)
      }

      this.component = component
      return
    }

    return this._promptComponent(availableComponents)
  }

  end () {
    const exec = Promise.promisify(execute)
    return exec(`${path.join(packagesPath, this.component)} --config ${require.resolve('eslint-config-tl3')}`)
      .catch((err) => {
        this.log(chalk.red(err))
      })
  }
}
