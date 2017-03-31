import { createDuck } from '@libs/lash'
import caSerpOffersViewerDuck from '@ecosystems/CaSerpOffersViewer/ducks'
import searchBarDuck from '@organisms/SearchBar/ducks/index.js'

const searchBar = searchBarDuck.raiseDuckling()
const caSerpOffersViewer = caSerpOffersViewerDuck.raiseDuckling()

const initialState = {
	searchBarOpened: false,
	isOffersLoading: false,
}

export default createDuck({
	name: 'caSerpPage',
	initialState,
	isfwl: true,
	ducklings: {
		caSerpOffersViewer,
		searchBar,
	},
	transformations: {
		setOffersLoadingFlag: (state, { payload }) => ({ ...state, isOffersLoading: payload }),
		openSearchBar: (state) => ({ ...state, searchBarOpened: true }),
		closeSearchBar: (state) => ({ ...state, searchBarOpened: false }),
	}
})
