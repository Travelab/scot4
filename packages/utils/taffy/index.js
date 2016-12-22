import classNames from 'classnames/bind'

import { create as createJss } from 'jss'
import { create as createGrid } from 'perdido'
import { create as createInjectSheet } from 'react-jss'

//import global from 'jss-global'
import extend from 'jss-extend'
import nested from 'jss-nested'
//import compose from 'jss-compose'
import camelCase from 'jss-camel-case'
import defaultUnit from 'jss-default-unit'
import expand from 'jss-expand'
import vendorPrefixer from 'jss-vendor-prefixer'
import propsSort from 'jss-props-sort'

import defaultUnits from './defaultUnits'
import gridOptions from './gridOptions'

const presetOptions = {
	defaultUnit: defaultUnits
}

const preset = (options = {}) => ({
	plugins: [
		//global(options.global),
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

export const grid = createGrid(gridOptions)

export const makeCX = ($) => classNames.bind($)