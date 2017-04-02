import { isPlainObject } from 'lodash'
import MPS from '@libs/mono-pub-sub'

const err1 = new Error('Prop `options` must be setted')
const err2 = new Error('Prop `values` must be setted')
const err3 = new Error('Prop `values.default` must be setted')

const defaultState = 0 // Первый элемент массива

class Switcher extends MPS {

	constructor ({ options, values }) {
		super()

		if (typeof options !== 'object') throw err1
		if (typeof values !== 'object') throw err2
		if (!values.default) throw err3

		this.options = options
		this.values = values

		this.setState()
	}

	setState (state = defaultState) {

		if (state === this.state) return

		this.state = state

		this.emit({ state, value: this.getValue() })
	}

	getValue () {

		let value

		const option = this.options[this.state]
		if (option) {

			let pointer = option.pointer
			if (typeof pointer === 'function') pointer = pointer()

			value = this.values[pointer]

			if (isPlainObject(value)) {
				value = { ...this.values.default, ...value }
			}
		}

		if (!value) value = this.values.default

		return value
	}
}

export default Switcher
