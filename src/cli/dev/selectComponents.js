import glob from 'glob'
import chalk from 'chalk'
import inquirer from 'inquirer'
import coolTrim from 'cool-trim'

import path, { cliBase, packagesPath } from '../../path'

const manifestOfDevDir = require(path.join(cliBase, 'package.json'))

let dirOfComponents = []
if (manifestOfDevDir.scot4) {

	if (Array.isArray(manifestOfDevDir.scot4.components)) {

		dirOfComponents = manifestOfDevDir.scot4.components

	} else console.log(chalk.red('package.json should contain "scot4.components" property as array'))

} else console.log(chalk.red('package.json should contain "scot4" property'))

export default function (cmps = []) {

	const availableComponents = glob
		.sync(`+(${dirOfComponents.join('|')})/*/`, { cwd: packagesPath })
		.map((name) => name.slice(0, -1))

	const flow = ({ components }) => {

		let selectedComponents = []

		if (components === 'all') {

			return Promise.resolve(availableComponents)

		} else {

			selectedComponents = components
				.split(' ')
				.filter((component) => ~availableComponents.indexOf(component))

			if (selectedComponents.length) {

				return Promise.resolve(selectedComponents)

			} else {

				console.log(coolTrim`
					${chalk.green('All available components:')}
					${chalk.yellow(availableComponents.join(' '))}
				`)

				return inquirer.prompt([
					{
						type: 'input',
						name: 'components',
						message: 'Choose components',
						default: 'all'
					}
				]).then(flow)
			}
		}
	}

	return flow({ components: cmps.join(' ') })
}