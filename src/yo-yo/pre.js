import glob from 'glob'
import chalk from 'chalk'
import Base from './base.js'
import { validate as emailValidator } from 'email-validator'

export default class extends Base {

	initializing () {

		const name = this.getConfig('username') || 'anonymous'

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
			}
		]

		return this
			.prompt(prompts)
			.then(({username, email}) => {
				this.setConfig('username', username)
				this.setConfig('email', email)
			})
	}
}