import { getShared } from '../../utils'
import { storybookPath, selectComponentsLoaderPath } from '../../path'

const test = /config\.js$/
const include = [ storybookPath ]
const exclude = []

export default () => {

	const components = getShared('components')
	const patchWhyDidYouUpdate = getShared('patchWhyDidYouUpdate')

	return [
		{
			test, include, exclude,
			loader: selectComponentsLoaderPath,
			query: {
				components,
				patchWhyDidYouUpdate
			}
		}
	]
}