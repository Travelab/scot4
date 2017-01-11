import chalk from 'chalk'
import Base from './base.js'

export default class extends Base {

	end () {

		this.log(chalk.green(`All done! See you next time ;-)`))
	}

}