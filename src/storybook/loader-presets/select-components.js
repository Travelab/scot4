import { getShared } from '../../utils'
import { entryPath, selectComponentsLoaderPath } from '../../path'

const test = /storybull\.js$/
const include = [ entryPath ]
const exclude = []

export default () => {

	const components = getShared('components')

	return [
		{
			test, include, exclude,
			loader: selectComponentsLoaderPath,
			query: {
				components,
			}
		}
	]
}