import glob from 'glob'
import chalk from 'chalk'
import Base from './base.js'
import { validate as emailValidator } from 'email-validator'

export default class extends Base {

	initializing () {
		this.name = this.getConfig('username')
		this.email = this.getConfig('email')

		this.log(chalk.green(`Hello ${chalk.yellow(this.name || 'anonymous')}! Wana drink? :-)`))
	}

	prompting () {
		const prompts = [
			{
				type: 'input',
				name: 'username',
				message: 'What\'s your Github username',
				default: this.user.git.name(),
				validate: (input) => (input !== ''),
				when: () => (!this.name),
			},
			{
				type: 'input',
				name: 'email',
				message: 'What\'s your email',
				default: this.user.git.email(),
				validate: (input) => (!emailValidator(input) ? 'Pls, type correct email' : true),
				when: () => (!this.email),
			}
		]

		return this
			.prompt(prompts)
			.then(({username, email}) => {
				username && this.setConfig('username', username)
				email && this.setConfig('email', email)
			})
	}
}