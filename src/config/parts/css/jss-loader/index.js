import { create } from 'jss'
import preset from 'jss-preset-default'

import defaultUnits from './defaultUnits.js'


const presetOptions = {
	defaultUnit: defaultUnits
}

const createGenerateClassName = () => {
	//let counter = 0
	return (rule, sheet) => (rule.key)
}

export default function (content) {

	const sheet = create({
		...preset(presetOptions),
		createGenerateClassName
	})

	const rules = this.exec(content, this.resource)

	return sheet
		.createStyleSheet(rules)
		.toString()
}
