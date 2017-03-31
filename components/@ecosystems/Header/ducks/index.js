import { createDuck } from '@libs/lash'
import searchBarDuck from '@organisms/SearchBar/ducks'

const searchBar = searchBarDuck.raiseDuckling()

const initialState = {
	isSideMenuOpened: false,
}

export default createDuck({
	name: 'header',
	initialState,
	ducklings: {
		searchBar
	},
	transformations: {
		openSideMenu: (state) => ({ ...state, isSideMenuOpened: true }),
		closeSideMenu: (state) => ({ ...state, isSideMenuOpened: false }),
	}
})

