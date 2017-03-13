import { createDuck, untouch } from '@libs/lash'

import serpMapDuck from '@ecosystems/SerpMap/ducks'
import serpOffersViewerDuck from '@ecosystems/SerpOffersViewer/ducks'

const serpMap = serpMapDuck.raiseDuckling()
const serpOffersViewer = serpOffersViewerDuck.raiseDuckling()

const initialState = { }

export default createDuck({
	name: 'serpSearchResults',
	initialState,
	isfwl: true,
	ducklings: {
		serpMap,
		serpOffersViewer
	},
	transformations: {
	}
})

