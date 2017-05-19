import { stringifyRequest, getOptions } from 'loader-utils'
import path, { packagesPath } from '../../../path'

const storyPath = 'stories/index.js'
const placeholder = '/* Place of required stories from CLI */'

module.exports = function (source) {

	let loader = this

	loader.cacheable && loader.cacheable()

	let { component } = getOptions(loader)

	if (!component) component = null

	let requiredStories = () => {

		let componentPath = path.join(packagesPath, component, storyPath)

		componentPath = stringifyRequest(loader, componentPath)

		return `require(${componentPath})`

	}

	source = source
		.replace(placeholder, requiredStories)

	return source
}
