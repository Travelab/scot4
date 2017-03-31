import { createDuck } from '@libs/lash'
import searchBarDuck from '@organisms/SearchBar/ducks/index.js'
import headerDuck from '@ecosystems/Header/ducks/index.js'

const searchBarDitch = searchBarDuck.raiseDuckling()
const headerDitch = headerDuck.raiseDuckling()

const initialState = {
	searchBarOpened: true,
	isSideMenuOpened: false
}

export default createDuck({
	name: 'travelabMainPage',
	initialState,
    isfwl: true,
	ducklings: {
		searchBarDitch,
		headerDitch,
	},
	transformations: {
		openSearchBar: (state) => ({ ...state, searchBarOpened: true}),
		closeSearchBar: (state) => ({ ...state, searchBarOpened: false}),
		openSideMenu: (state) => ({ ...state, isSideMenuOpened: true}),
		closeSideMenu: (state) => ({ ...state, isSideMenuOpened: false})
	}
})