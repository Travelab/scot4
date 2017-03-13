import { compose } from 'recompose'

import {
	connectDuck,
	injectStyle,
	injectArgs,
	injectCQ,
	pureDeco,
	pureDuckDeco,
	pureLangDeco,
	pureDuckWithLangDeco,
	withLangDeco,
	isfwlDeco
} from './comp-decorators.js'


const defaultOptions = {
	cq: null,
	args: null,
	duck: null,
	style: null,
	args: null,
	pure: true,
	withLang: true,
}

const createEnhancer = (options = {}) => {

	const { cq, duck, style, args, pure, withLang, isfwl } = { ...defaultOptions, ...options }
	const decorators = []

	if (duck) decorators.push(connectDuck(duck))

	if (withLang) decorators.push(withLangDeco)

	if (pure) {
		if (duck && withLang) decorators.push(pureDuckWithLangDeco)
		else if (duck) decorators.push(pureDuckDeco)
		else if (withLang) decorators.push(pureLangDeco)
		else decorators.push(pureDeco)
	}

	if (cq) decorators.push(injectCQ(cq))
	if (args) decorators.push(injectArgs(args))
	if (style) decorators.push(injectStyle(style))

	if (duck && duck.isfwl) decorators.push(isfwlDeco)

	return compose.apply(null, decorators)
}

const connectDuckWithoutLang = (duck, options) => createEnhancer({ ...options, duck, withLang: false })
const connectLangWithoutDuck = (options) => createEnhancer(options)
const connectDuckWithLang = (duck, options) => createEnhancer({ ...options, duck })

export {
	compose,
	createEnhancer,
	connectDuckWithoutLang,
	connectLangWithoutDuck,
	connectDuckWithLang,
	injectStyle,
	injectArgs
}
