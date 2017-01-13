import loaderUtils from 'loader-utils'
import pathNode, { packagesPath } from '../path'

const storyPath = 'stories/index.js'
const placeholder = '/* Place of required stories from CLI */'

module.exports = function (source) {

	let loader = this

	loader.cacheable && loader.cacheable()

	let { components, patchWhyDidYouUpdate } = loaderUtils.parseQuery(loader.query)

	if (!components) components = []

	let requiredStories = components.map((componentName) => {

		let componentPath = pathNode.join(packagesPath, componentName, storyPath)

		componentPath = loaderUtils.stringifyRequest(loader, componentPath)

		return `require(${componentPath})`

	}).join('\n')

	source = source
		.replace(placeholder, requiredStories)
		.replace('patchWhyDidYouUpdate', patchWhyDidYouUpdate ? 'true' : 'false')

	return source
}