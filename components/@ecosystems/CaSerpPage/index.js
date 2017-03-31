import LoadingSpinner from '@atoms/LoadingSpinner'
import CaHeader from '@molecules/CaHeader'
import { createEnhancer } from '@utils/decoract'

import SearchBar from '@organisms/SearchBar'
import CaSerpOffersViewer from '@ecosystems/CaSerpOffersViewer'

import duck from './ducks'
import style from './styles'

const cq = {
	t999: {
		maxWidth: 999,
	}
}

const enhancer = createEnhancer({
	cq,
	duck,
	style,
})


const CaSerpPage = ({ $, l, ditch, state, actions, cq }) => {

	const { t999 } = cq
	const { searchBar, caSerpOffersViewer } = ditch.getDitches()
	const { openSearchBar, closeSearchBar } = actions
	const { searchBarOpened, isOffersLoading } = state

	const propsSearchBar = {
		isOpened: searchBarOpened,
		openSearchBar,
		closeSearchBar,
		ditch: searchBar,
		isInlay: true,
		t999,
	}

	const loader = (
		<div className={$.loadingWrapper}>
			<LoadingSpinner clickaviaStyle/>
		</div>
	)	

	return (
		<div>
			<CaHeader/>
			<div className={$.container}>
				<div className={$.wrapper}>
					<div className={t999 ? $.mobileSearchBarWrapper: $.searchBarWrapper}>
						<SearchBar {...propsSearchBar}/>
					</div>
					
					{isOffersLoading ? loader : <CaSerpOffersViewer ditch={caSerpOffersViewer}/>}
				</div>
			</div>
		</div>
	)
}

export default enhancer(CaSerpPage)
