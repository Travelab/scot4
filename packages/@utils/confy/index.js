import { get } from 'lodash'

import MPS from '@libs/mono-pub-sub'

import Switcher from './Switcher.js'
import confyKeeper from './confy-keeper.js'
import { getArrayOfSwitchers } from './utils.js'
import configurations from './configurations/index.js'

class Confy extends MPS {

	constructor (configurations) {
		super()

		const switchers = {}

		getArrayOfSwitchers(configurations).forEach(({ switcher, path }) => {

			path = path.join('.')

			switcher.on(({ state, value }) => {
				const version = ++this.version
				this.emit({ path, value, state, version })
			})

			switchers[path] = switcher
		})

		this.switchers = switchers
		this.version = 0
	}

	get (path, defaultValue) {

		let value = get(configurations, path, defaultValue)

		if (value !== defaultValue) {

			if (value instanceof Switcher) value = value.getValue()
		}

		return value
	}

	switch (path, state) {

		const switcher = this.switchers[path]

		if (switcher) switcher.setState(state)
	}
}

const defaultConfy = new Confy(configurations)

confyKeeper(defaultConfy)

export default defaultConfy
