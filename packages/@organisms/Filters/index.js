import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'
import obc from '@libs/obc'
import { min, max } from 'lodash'

import ValuesRangeTxtLabel from '@atoms/ValuesRangeTxtLabel'
import Dropdown from '@molecules/Dropdown'
import Slider from '@atoms/Slider'
import Checkbox from '@atoms/Checkbox'
import HotelStars from '@molecules/HotelStars'

import duck from './ducks/index.js'
import style from './styles/index.js'

const cq = {
	t999: {
		maxWidth: 999
	}
}
const cx = makeCX()
const enhancer = createEnhancer({
	cq,
	duck,
	style,
	// if need offers uncomment this
	/*	args: {
		getOffers: obc.getOffers,
	},*/
})

const Filters = ({ $, l, state, cq, actions/*, args*/ }) => {

	// Duck's state decomposition
	const { selectedField, price, rating, distanceFromCenter, stars } = state

	// Duck's actions decomposition
	const {
		selectField,
		setPriceFrom,
		setPriceTo,
		setRatingFrom,
		setRatingTo,
		setDistanceFrom,
		setDistanceTo,
		toggleStars,
		setFilter
	} = actions

	const { t999 } = cq

	const onBlur = () => selectField('')

	// data for price filter
	const priceSliderStart = 0
	const priceSliderEnd = 100000
	const priceFrom = price.from !== null ? price.from : priceSliderStart
	const priceTo = price.to !== null ? price.to : priceSliderEnd

	const txtPriceTitle = l('Стоимость тура')
	const txtPriceFrom = l.currency(priceFrom, 'RUB')
	const txtPriceTo = l.currency(priceTo, 'RUB')

	const propsPriceLabelField = {
		title: txtPriceTitle,
		values: [ txtPriceFrom, priceTo < priceSliderEnd ? txtPriceTo : Infinity ],
		isInRows: t999
	}

	const propsPriceSlider = {
		start: priceSliderStart,
		end: priceSliderEnd,
		from: priceFrom,
		to: priceTo,
		txtFromValue: txtPriceFrom,
		txtToValue: priceTo < priceSliderEnd ? txtPriceTo : txtPriceTo + ' +',
		onFromChange: setPriceFrom,
		onToChange: setPriceTo,
		onEndFrom: () => setFilter({ path: ['price', 'from'], value: priceFrom }),
		onEndTo: () => setFilter({ path: ['price', 'to'], value: priceTo })
	}

	// data for rating
	const ratingSliderStart = 0
	const ratingSliderEnd = 10
	const ratingFrom = rating.from !== null ? rating.from : ratingSliderStart
	const ratingTo = rating.to !== null ? rating.to : ratingSliderEnd

	const txtRatingTitle = l('Оценка')
	const propsRatingLabelField = {
		title: txtRatingTitle,
		values: [ ratingFrom, ratingTo < ratingSliderEnd ? ratingTo : Infinity ],
		isInRows: t999,
	}

	const propsRatingSlider = {
		start: ratingSliderStart,
		end: ratingSliderEnd,
		from: ratingFrom,
		to: ratingTo,
		txtFromValue: `${ratingFrom}`,
		txtToValue: `${ratingTo}`,
		onFromChange: setRatingFrom,
		onToChange: setRatingTo,
		onEndFrom: () => setFilter({ path: ['rating', 'from'], value: ratingFrom }),
		onEndTo: () => setFilter({ path: ['rating', 'to'], value: ratingTo })
	}

	// data for distance from center
	const distanceSliderStart = 1
	const distanceSliderEnd = 30
	const distanceFrom = distanceFromCenter.from !== null ? distanceFromCenter.from : distanceSliderStart
	const distanceTo = distanceFromCenter.to !== null ? distanceFromCenter.to : distanceSliderEnd

	const txtDistanceTitle = l('От центра')
	const txtDistanceFrom = distanceFrom + l(' км')
	const txtDistanceTo = distanceTo + l(' км')

	const propsDistanceLabelField = {
		title: txtDistanceTitle,
		values: [ txtDistanceFrom, distanceTo < distanceSliderEnd ? txtDistanceTo : Infinity ],
		isInRows: t999,
	}

	const propsDistanceSlider = {
		start: distanceSliderStart,
		end: distanceSliderEnd,
		from: distanceFrom,
		to: distanceTo,
		txtFromValue: txtDistanceFrom,
		txtToValue: distanceTo < distanceSliderEnd ? txtDistanceTo : txtDistanceTo + ' +',
		onFromChange: setDistanceFrom,
		onToChange: setDistanceTo,
		onEndFrom: () => setFilter({ path: ['distanceFromCenter', 'from'], value: distanceFrom }),
		onEndTo: () => setFilter({ path: ['distanceFromCenter', 'to'], value: distanceTo })
	}


	// data for stars filter
	const txtStarsTitle = l('Звездность')

	const propsStarsLabelField = {
		title: txtStarsTitle,
		maxValuesCount: 5,
		values: stars.map((el, i) => el ? i + 1 : el).filter((el) => el),
		isInRows: t999,
	}

	const starsCheckBoxItems = stars.map((el, i) => {
		const starsAmount = i + 1
		const isChecked = el ? 'checked' : ''

		// TODO: make desicion for getting data below
		const hotelsAmount = 123

		return {
			label: <HotelStars stars={starsAmount} />,
			checked: isChecked,
			note: hotelsAmount,
			onChange: () => toggleStars(i)
		}
	})

	const renderFiltersHeader = () => (
		<div className={$.filtersHeader}>
			<div className={$.filtersLabel}>{l('Фильтры')}</div>
		</div>
	)

	const propsPriceDropdown = {
		fields: [{
			component: (<ValuesRangeTxtLabel { ...propsPriceLabelField }/>),
			isActivated: selectedField === 'PriceFilter' || t999
		}],
		dropdownBlock: (<Slider { ...propsPriceSlider } />),
		withoutBorders: true,
		withoutBackground: t999,
		isInlayDropdown: t999
	}

	const propsRatingDropdown = {
		fields: [{
			component: (<ValuesRangeTxtLabel { ...propsRatingLabelField }/>),
			isActivated: selectedField === 'RatingFilter' || t999
		}],
		dropdownBlock: (<Slider { ...propsRatingSlider }/>),
		withoutBorders: true,
		withoutBackground: t999,
		isInlayDropdown: t999
	}

	const propsDistanceDropdown = {
		fields: [{
			component: (<ValuesRangeTxtLabel { ...propsDistanceLabelField }/>),
			isActivated: selectedField === 'DistanceFilter' || t999
		}],
		dropdownBlock: (<Slider { ...propsDistanceSlider }/>),
		withoutBorders: true,
		withoutBackground: t999,
		isInlayDropdown: t999
	}

	const propsStarsDropdown = {
		fields: [{
			component: (<ValuesRangeTxtLabel { ...propsStarsLabelField }/>),
			isActivated: selectedField === 'StarsFilter' || t999
		}],
		dropdownBlock: (<Checkbox items={starsCheckBoxItems}/>),
		withoutBorders: true,
		withoutBackground: t999,
		isInlayDropdown: t999
	}

	const containerClass = cx({
		[$.container]: !t999,
		[$.mobileContainer]: t999
	})

	const priceFilterClass = cx({
		[$.filter]: true,
		[$.rightBorder]: !t999,
		[$.mobileFilter]: t999,
		[$.priceFilter]: true
	})
	const ratingFilterClass = cx({
		[$.filter]: true,
		[$.rightBorder]: !t999,
		[$.mobileFilter]: t999,
		[$.ratingFilter]: true
	})
	const distanceFilterClass = cx({
		[$.filter]: true,
		[$.rightBorder]: !t999,
		[$.mobileFilter]: t999,
		[$.distanceFilter]: true
	})
	const starsFilterClass = cx({
		[$.filter]: true,
		[$.rightBorder]: !t999,
		[$.mobileFilter]: t999,
		[$.starsFilter]: true
	})

	const handleClick = (fieldName) => {
		if (t999) return

		selectField(fieldName)
	}
	const handleBlur = () => {
		if (t999) return

		onBlur()
	}

	return (
		<div className={containerClass}>
			{ t999 && renderFiltersHeader() }
			<div className={priceFilterClass} tabIndex={1} onClick={() => handleClick('PriceFilter')} onBlur={handleBlur}>
				<Dropdown { ...propsPriceDropdown } />
			</div>

			<div className={ratingFilterClass} tabIndex={1} onClick={() => handleClick('RatingFilter')} onBlur={handleBlur}>
				<Dropdown { ...propsRatingDropdown } />
			</div>

			<div className={distanceFilterClass} tabIndex={1} onClick={() => handleClick('DistanceFilter')} onBlur={handleBlur}>
				<Dropdown { ...propsDistanceDropdown } />
			</div>

			<div className={starsFilterClass} tabIndex={1} onClick={() => handleClick('StarsFilter')} onBlur={handleBlur}>
				<Dropdown { ...propsStarsDropdown } />
			</div>
		</div>
	)
}

export default enhancer(Filters)

