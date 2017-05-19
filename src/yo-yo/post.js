import chalk from 'chalk'
import Base from './base.js'

export default class extends Base {
	end () {
		const message = 'All done! See you next time ;-)'
		this.log(chalk.green(message))
	}
}
