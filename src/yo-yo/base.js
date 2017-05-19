import Base from 'yeoman-generator'
import { cliBase } from '../path'

export default class extends Base {

	copy (src, dest) {
		this.fs.copyTpl(
			this.templatePath(src),
			this.destinationPath(dest || src),
			this.context
		)
	}

	getConfig (key) {

		const prev = this.destinationRoot()

		this.destinationRoot(cliBase)
		const val = this.config.get(key)
		this.destinationRoot(prev)

		return val
	}

	setConfig (key, val) {

		const prev = this.destinationRoot()

		this.destinationRoot(cliBase)
		this.config.set(key, val)
		this.destinationRoot(prev)
	}

}