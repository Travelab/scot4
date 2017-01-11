import chalk from 'chalk'
import Base from './base.js'

const defaultComponentChoices = [
	{ name: 'atoms', checked: true },
	{ name: 'molecules', checked: true },
	{ name: 'organisms', checked: true },
	{ name: 'ecosystems', checked: true },
	{ name: 'environment', checked: true },
	{ name: 'examples', checked: true },
	{ name: 'shit' },
]

export default class extends Base {

	initializing () {

		this.log(chalk.green(`Hello ${chalk.yellow(this.user.git.name())}! Wana drink? :-)`))
	}

	prompting () {

		const prompts = [
			{
				type: 'checkbox',
				name: 'defaultFoldersOfComponents',
				message: 'Choose folders for components',
				choices: defaultComponentChoices,
				validate: (answer) => (answer.length < 1 ? 'You must choose at least one folder' : true),
				when: () => (!this.getConfig('components'))
			}
		]

		return this
			.prompt(prompts)
			.then((answers) => {

				const { defaultFoldersOfComponents } = answers

				if (Array.isArray(defaultFoldersOfComponents))
					this.setConfig('components', defaultFoldersOfComponents)
			})
	}

}