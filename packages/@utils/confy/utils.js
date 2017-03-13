import Switcher from './Switcher.js'

const getArrayOfSwitchers = (obj, parentPath = [], accumulator = []) => {

	let key, value, path

	for (key in obj) {

		value = obj[key]
		path = [ ...parentPath, key ]

		if (value instanceof Switcher) {

			accumulator.push({ switcher: value, path })
		}
		else if (typeof value === 'object' && value !== null) {

			getArrayOfSwitchers(value, path, accumulator)
		}
	}

	return accumulator
}

const makeSwitcher = (desc) => {

	if (!desc.values) desc.values = {}

	return (values = {}) => {

		values = Object.assign({}, desc.values, values)

		return new Switcher({ ...desc, values })
	}
}

export {
	getArrayOfSwitchers,
	makeSwitcher,
}