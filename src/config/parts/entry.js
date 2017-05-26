import path from 'path'
import fs from 'fs'
import { entryDirectPath, entryStorybullPath } from '../../path'

export default ({ rootComponent, checkoutStorybook } = {}) => {
	if (!checkoutStorybook || process.env.NODE_ENV === 'production') {
		const entryIndex = path.join(rootComponent, 'entry', 'index.js')
		if (fs.existsSync(entryIndex)) {
			return {
				entry: {
					common: entryIndex
				},
				resolve: {}
			}
		}

		return {
			entry: {
				common: entryDirectPath
			},
			resolve: {
				alias: {
					'root-component': rootComponent,
					duck: path.join(rootComponent, 'ducks') || '',
					saga: path.join(rootComponent, 'sagas') || ''
				}
			}
		}
	}

	return {
		entry: {
			preview: require.resolve(entryStorybullPath)
		}
	}
}
