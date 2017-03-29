import fs from 'fs'
import path from 'path'
import glob from 'glob'
import open from 'open'
import chalk from 'chalk'
import autocomplete from 'inquirer-autocomplete-prompt'
import webpack from 'webpack'
import {CLIEngine} from 'eslint'

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

		const choicesComponents = availableComponents.map((component) => {

			const [ folder, name ] = component.split('/')

			return {
				name: `${name} ${chalk.gray(folder)}`,
				short: name,
				value: component
			}
		})

		const chooser = (answers, input) => {

			return Promise.resolve(
				input
					? choicesComponents.filter((c) => ~c.name.indexOf(input))
					: choicesComponents
			)
		}

		let { componentsPaths } = this.options
		if (Array.isArray(componentsPaths)) {

			componentsPaths = componentsPaths
				.filter((c) => ~availableComponents.indexOf(c))

			if (componentsPaths.length) {
				const choosedComponents = componentsPaths.map((c) => chalk.yellow(c)).join(', ')
				this.log(`Components were choosed: ${choosedComponents}`)
				this.components = componentsPaths
			}
		}

    const prompts = [{
      type: 'autocomplete',
      name: 'component',
      message: `Which ${chalk.yellow('component')} do you want to dev?`,
      validate: (component) => (!!~availableComponents.indexOf(component)),
      source: chooser,
      when: () => (!this.components)
    }, {
      type: 'confirm',
      name: 'doLinter',
      message: `Do you want use eslint?`,
      default: false
    }]

		return Promise
			.all([
				selectPort(),
				this.prompt(prompts)
			])
			.then(([ port, answers ]) => {

				this.port = port
				this.answers = answers

				if (!this.components) this.components = [ answers.component ]
			})
	}

	generating() {
		if (!fs.existsSync(dllPath)) {
			const compiler = webpack(loadConfig(dllPath))
			logger('=> Create dll manifest')
      return Promise.promisify(compiler.run, {context: compiler})()
	      .then(() => logger('=> Dll manifest created'))
		}
	}

	end () {

		const {doLinter} = this.answers

		if (doLinter) {
      const linter = new CLIEngine({
        configFile: require.resolve('eslint-config-tl3')
      })
      const lintFiles = this.components.map(component => path.join(packagesPath, component))
			const report = linter.executeOnFiles(lintFiles)
			if (report.errorCount > 0 || report.warningCount > 0) {
        const messageFormatter = linter.getFormatter()
        logger(messageFormatter(report.results))
        return;
			}
		}

		setShared('components', this.components)

		startServer(null, this.port)
			.then((address) => open(address))
	}

}