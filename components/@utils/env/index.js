import confy from '@utils/confy'
import { dev, prod, mock, stage } from '@utils/confy/switchers/globalEnv.js'

class Env {

	get isStage () {
		return this.is(stage)
	}

	get isMock () {
		return this.is(mock)
	}

	get isProd () {
		return this.is(prod)
	}

	get isDev () {
		return this.is(dev)
	}

	is (env) {
		return confy.get('ENV') === env
	}
}

export default new Env