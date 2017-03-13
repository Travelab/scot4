import classNames from 'classnames/bind'

import { create as createJss } from 'jss'
import { create as createInjectSheet } from 'react-jss'

import global from 'jss-global'
import extend from 'jss-extend'
import nested from 'jss-nested'
//import compose from 'jss-compose'
import camelCase from 'jss-camel-case'
import defaultUnit from 'jss-default-unit'
// https://github.com/typical000/jss-expand/blob/master/docs/index.md
import expand from 'jss-expand'
import vendorPrefixer from 'jss-vendor-prefixer'
import propsSort from 'jss-props-sort'

import defaultUnits from './defaultUnits'

const presetOptions = {
	defaultUnit: defaultUnits
}

const preset = (options = {}) => ({
	plugins: [
		global(options.global),
		extend(options.extend),
		nested(options.nested),
		//compose(options.compose),
		camelCase(options.camelCase),
		defaultUnit(options.defaultUnit),
		expand(options.expand),
		vendorPrefixer(options.vendorPrefixer),
		propsSort(options.propsSort)
	]
})

const jss = createJss().setup(preset(presetOptions))

export const injectSheet = createInjectSheet(jss)

// https://github.com/wldcordeiro/perdido

export const makeCX = ($) => classNames.bind($)

// Soft Grid
export const sg = (pt) => (8 * pt)

// Пустышка для выдачи значений переменных, которые в будущем должны быть зависимы от темы
export const tm = (prop, val) => (val)