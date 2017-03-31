import { createDuck, untouch } from '@libs/lash'
import headerDuck from '@ecosystems/Header/ducks'
import filtersDuck from '@organisms/Filters/ducks'
import searchBarDuck from '@organisms/SearchBar/ducks'
import serpSearchResultsDuck from '@ecosystems/SerpSearchResults/ducks'
import fakeProgressBarDuck from '@molecules/FakeProgressBar/ducks'
import serpTabulatorDuck from '@ecosystems/SerpTabulator/ducks'

const header = headerDuck.raiseDuckling()
const searchBar = searchBarDuck.raiseDuckling()
const filters = filtersDuck.raiseDuckling()
const searchResults = serpSearchResultsDuck.raiseDuckling()
const fakeProgressBar = fakeProgressBarDuck.raiseDuckling()
const serpTabulator = serpTabulatorDuck.raiseDuckling()

const initialState = {
	activeDisplay: 'OffersList',
	isOffersLoading: false,
}

export default createDuck({
	name: 'serpPage',
	initialState,
	isfwl: true,
	ducklings: {
		header,
		searchBar,
		filters,
		searchResults,
		fakeProgressBar,
		serpTabulator
	},
	transformations: {
		setOffersLoadingFlag: (state, { payload }) => ({ ...state, isOffersLoading: payload }),
		setActiveDisplay: (state, { payload }) => ({ ...state, activeDisplay: payload }),
		doNothing: untouch,
	}
})

