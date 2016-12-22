import open from 'open'

import selectPort from './selectPort'
import startServer from './startServer'
import selectComponents from './selectComponents'
import { setComponents } from './shareComponents'

export default (cmps) => {

	Promise.all([
		selectPort(),
		selectComponents(cmps).then(setComponents)
	])
		.then(([ port ]) => startServer(null, port))
		.then((address) => open(address))
}