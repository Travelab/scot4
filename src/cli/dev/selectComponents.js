import glob from 'glob'
import chalk from 'chalk'
import inquirer from 'inquirer'
import coolTrim from 'cool-trim'

import manifest from '../../../package.json'
import { packagesPath } from '../../path'

const dirOfComponents = manifest.scot4.components

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