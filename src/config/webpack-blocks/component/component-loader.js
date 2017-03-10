import { stringifyRequest, getOptions } from 'loader-utils'
import pathNode, { packagesPath } from '../../path'

const storyPath = 'stories/index.js'
const placeholder = '/* Place of required stories from CLI */'

module.exports = function (source) {

	let loader = this

	loader.cacheable && loader.cacheable()

	let { components } = getOptions(loader)

	if (!components) components = []

	let requiredStories = components.map((componentName) => {

		let componentPath = pathNode.join(packagesPath, componentName, storyPath)

		componentPath = stringifyRequest(loader, componentPath)

		return `require(${componentPath})`

	}).join('\n')

	source = source
		.replace(placeholder, requiredStories)

	return source
}