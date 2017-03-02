import chalk from 'chalk'
import { validate as emailValidator } from 'email-validator'
import Base from './base.js'

const defaultComponentChoices = [
	{ name: '@atoms', checked: true },
	{ name: '@molecules', checked: true },
	{ name: '@organisms', checked: true },
	{ name: '@ecosystems', checked: true },
	{ name: '@environment', checked: true },
	{ name: '@examples', checked: true },
	{ name: '@shit' },
]

export default class extends Base {

	initializing () {

		const name = this.getConfig('username') || 'stranger'

		this.log(chalk.green(`Hello ${chalk.yellow(name)}! Wana drink? :-)`))
	}

	prompting () {

		const prompts = [
			{
				type: 'input',
				name: 'username',
				message: 'What\'s your Github username',
				default: this.user.git.name(),
				validate: (input) => (input !== ''),
				when: () => (!this.getConfig('username')),
			},
			{
				type: 'input',
				name: 'email',
				message: 'What\'s your email',
				default: this.user.git.email(),
				validate: (input) => (!emailValidator(input) ? 'Pls, type correct email' : true),
				when: () => (!this.getConfig('email')),
			},
			{
				type: 'checkbox',
				name: 'defaultFoldersOfComponents',
				message: 'Choose folders for components',
				choices: defaultComponentChoices,
				validate: (answer) => (answer.length < 1 ? 'You must choose at least one folder' : true),
				when: () => (!this.getConfig('components')),
			}
		]

		return this
			.prompt(prompts)
			.then((answers) => {

				const { username, email, defaultFoldersOfComponents } = answers

				username && this.setConfig('username', username)
				email && this.setConfig('email', email)

				if (Array.isArray(defaultFoldersOfComponents))
					this.setConfig('components', defaultFoldersOfComponents)
			})
	}

}