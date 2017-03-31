import { createDuck } from '@libs/lash'
import searchBarDuck from '@organisms/SearchBar/ducks/index.js'

const searchBar = searchBarDuck.raiseDuckling()

const initialState = {
	searchBarOpened: false
}

export default createDuck({
	name: 'caIndexPage',
	initialState,
	isfwl: true,
	ducklings: {
		searchBar
	},
	transformations: {
		openSearchBar: (state) => ({ ...state, searchBarOpened: true}),
		closeSearchBar: (state) => ({ ...state, searchBarOpened: false})
	}
})
