import { StickyContainer } from '@libs/velcro'
import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import CircleBtn from '@atoms/CircleBtn'
import Header from '@ecosystems/Header'
import Filters from '@organisms/Filters'
import SerpSearchResults from '@ecosystems/SerpSearchResults'
import FakeProgressBar from '@molecules/FakeProgressBar'

import duck from './ducks/index.js'
import style from './styles/index.js'

import filtersIcon from './img/filters.svg'
import mapIcon from './img/map.svg'
import listIcon from './img/list.svg'

const cq = {
	t999: {
		maxWidth: 999
	}
}

const enhancer = createEnhancer({
	cq,
	duck,
	style,
})
const cx = makeCX()

const SerpPage = ({ $, l, ditch, state, actions, cq }) => {

	const { isOffersLoading, activeDisplay } = state
	const { setActiveDisplay } = actions
	const { t999 } = cq

	const renderProgresBar = () => {
		return (
			<div className={$.progressBarWrapper}>
				<FakeProgressBar ditch={ditch.getDitches().fakeProgressBar}/>
			</div>
		)
	}

	const renderFiltersBtn = () => {
		let text = ''
		let onClick = null

		if (activeDisplay !== 'Filters') {
			text = l('Фильтры')
			onClick= () => setActiveDisplay('Filters')
		}
		else if (activeDisplay === 'Filters') {
			text = l('Применить фильтры')
			onClick = () => setActiveDisplay('OffersList')
		}

		const propsFiltersBtn = {
			img: { src: filtersIcon, alt: ''},
			text,
			background: '#ff9233',
			color: 'white',
			fontSize: 10,
			onClick
		}

		return (
			<div className={$.filtersBtn}>
				<CircleBtn { ...propsFiltersBtn } />
			</div>
		)
	}

	const renderListMapBtn = () => {
		let text = ''
		let img = null
		let onClick = null
		if (activeDisplay === 'Map') {
			img = { src: listIcon, alt: 'list' }
			text = l('Список')
			onClick = setActiveDisplay.bind(null, 'OffersList')
		}
		else {
			img = { src: mapIcon, alt: 'map' }
			text = l('На карте')
			onClick = setActiveDisplay.bind(null, 'Map')
		}

		const propsFiltersBtn = {
			img,
			text,
			background: '#00acb0',
			color: 'white',
			fontSize: 10,
			onClick
		}

		return (
			<div className={$.mapListBtn}>
				<CircleBtn { ...propsFiltersBtn } />
			</div>
		)
	}

	const renderFilters = () => (
		<div className={$.filtersWrapper}>
			<Filters ditch={ditch.getDitches().filters}/>
		</div>
	)

	const isMapActivated = activeDisplay === 'Map'
	const isOffersListActivated = activeDisplay === 'OffersList'

	const propsSerpSearchResults = {
		isMapActivated: isMapActivated || !t999,
		isOffersListActivated: isOffersListActivated || !t999,
		ditch: ditch.getDitches().searchResults
	}

	const renderSerpSearchResults = () => (
		<div className={$.searchResultsWrapper}>
			<SerpSearchResults { ...propsSerpSearchResults }/>
		</div>
	)

	const propsHeader = {
		isSeachBarAcitvated: activeDisplay === 'SearchBar',
		openSearchBar: setActiveDisplay.bind(null, 'SearchBar'),
		closeSearchBar: setActiveDisplay.bind(null, 'OffersList'),
		ditch: ditch.getDitches().header
	}

	const scrollableClass = cx({
		[$.scrollable]: t999
	})

	const wrapperClass = cx({
		[$.wrapper]: !t999,
		[$.mobileWrapper]: t999,
		[$.nonScrollableY]: t999
	})

	const canRenderFilters = !t999 || (t999 && activeDisplay === 'Filters')
	const canRenderSearchResults = !t999
		|| (t999 && (isMapActivated || isOffersListActivated))
	const canRenderProgressBar = t999 && isOffersLoading

	return (
		<div className={$.container}>
			<div className={wrapperClass}>
				<StickyContainer>
					<div className={$.headerWrapper}>
						<Header { ...propsHeader }>
							{ canRenderProgressBar ? renderProgresBar() : null }
							{ t999 ? renderFiltersBtn() : null }
							{ t999 ? renderListMapBtn() : null }
							{ canRenderFilters ? renderFilters() : null }
							<div className={scrollableClass}>
								{ canRenderSearchResults ? renderSerpSearchResults() : null }
							</div>
						</Header>
					</div>
				</StickyContainer>
			</div>
		</div>
	)
}

export default enhancer(SerpPage)

