import { getComponents } from '../../cli/dev/shareComponents'
import { storybookPath, selectComponentsLoaderPath } from '../../path'

const test = /config\.js$/
const include = [ storybookPath ]
const exclude = []

export default () => {

	const components = getComponents()

	return [
		{
			test, include, exclude,
			loader: selectComponentsLoaderPath,
			query: { components }
		}
	]
}