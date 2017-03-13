import ReactDOM from 'react-dom'
import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import SearchInfoBar from '@atoms/SearchInfoBar'
import SearchBtn from '@atoms/SearchBtn'
import TravelersSelector from '@molecules/TravelersSelector'
import DateRangePicker from '@molecules/DateRangePicker'
import Autocomplete from '@molecules/Autocomplete'

import duck from './ducks'
import style from './style'

const cq = {
	t999: {
		maxWidth: 999
	}
}
const cx = makeCX()
const enhancer = createEnhancer({ duck, style })

const SearchBar = ({ $, l, ditch, state, actions, ...props }) => {

	const { srcAutocomplete, dstAutocomplete } = ditch.getDitches()
	const srcAutocompleteState = srcAutocomplete.getState(state)
	const dstAutocompleteState = dstAutocomplete.getState(state)

	const {
		consist,
		selectedField,
		invalidFields,
		outboundDate,
		inboundDate,
	} = state

	const {
		selectField,
		setInvalidFields,

		selectAdults,
		selectChildren,
		selectInfants,

		setOutboundDate,
		setInboundDate,

		setFilter
	} = actions

	const { t999, isOpened, openSearchBar, closeSearchBar } = props

	let TravelersSelectorNode = null

	const onFromDayClick = (day) => {
		setOutboundDate(day)

		const newField = inboundDate ? 'TravelersSelector' : 'InboundDate'

		selectField(newField)

		newField === 'TravelersSelector' && TravelersSelectorNode && TravelersSelectorNode.focus()
	}

	const onToDayClick = (day) => {
		setInboundDate(day)

		const newField = outboundDate ? 'TravelersSelector' : 'OutboundDate'

		selectField(newField)

		newField === 'TravelersSelector' && TravelersSelectorNode && TravelersSelectorNode.focus()
	}

	const getInvalidFields = () => {
		let retVal = []

		if (outboundDate === null) retVal.push('OutboundDate')
		if (inboundDate === null) retVal.push('InboundDate')
		if (srcAutocompleteState.inputValue === '') retVal.push('DepartureLocation')
		if (dstAutocompleteState.inputValue === '') retVal.push('DestinationLocation')

		return retVal
	}

	const handleSearchBtnClick = () => {
		const fields = getInvalidFields()
		setInvalidFields(fields)

		if (fields.length === 0) {
			const srcObj = srcAutocompleteState.rawValue
			const dstObj = dstAutocompleteState.rawValue

			// 2016-01-21T21:00:00.000Z => 2016-01-21
			const dateBeforeTRegExp = /.+(?=T)/
	
			const searchData = {
				src: `${srcObj.title}:${srcObj.kind}:${srcObj.id}`,
				dst: `${dstObj.title}:${dstObj.kind}:${dstObj.id}`,
				departDate: outboundDate.toISOString().match(dateBeforeTRegExp)[0],
				returnDate: inboundDate.toISOString().match(dateBeforeTRegExp)[0],
				consist: [consist.adults, consist.children, consist.infants],
			}

			setFilter(searchData)

			if (t999) closeSearchBar()
		}

	}

	const propsDepartureAutocomplete = {
		placeholder: l('Откуда?'),
		withSeparator: !t999,
		isActivated: selectedField === 'DepartureLocation',
		isInvalid: invalidFields.indexOf('DepartureLocation') >= 0,
		onFieldClick: () => selectField('DepartureLocation'),
		onBlur: () => selectField(''),
		isInlayDropdown: t999,
		ditch: srcAutocomplete
	}

	const propsDestinationAutocomplete = {
		placeholder: l('Куда?'),
		withSeparator: !t999,
		isActivated: selectedField === 'DestinationLocation',
		isInvalid: invalidFields.indexOf('DestinationLocation') >= 0,
		onFieldClick: () => selectField('DestinationLocation'),
		onBlur: () => selectField(''),
		isInlayDropdown: t999,
		ditch: dstAutocomplete
	}

	const propsDateRangePicker = {
		withSeparator: !t999,
		fromDate: outboundDate,
		toDate: inboundDate,
		isFromFieldActivated: selectedField === 'OutboundDate',
		isToFieldActivated: selectedField === 'InboundDate',
		isFromFieldInvalid: invalidFields.indexOf('OutboundDate') >= 0,
		isToFieldInvalid: invalidFields.indexOf('InboundDate') >= 0,
		onFromFieldClick: () => {
			if (selectedField !== 'OutboundDate') {
				selectField('OutboundDate')
			}
			else {
				selectField('')
			}
		},
		onBlur: () => selectField(''),
		onToFieldClick: () => {
			if (selectedField !== 'InboundDate') {
				selectField('InboundDate')
			}
			else {
				selectField('')
			}
		},
		onFromDayClick,
		onToDayClick,
		isInlayDropdown: t999
	}

	const propsTravelersSelector = {
		isActivated: selectedField === 'TravelersSelector',
		adultsValue: consist.adults,
		childrenValue: consist.children,
		infantsValue: consist.infants,

		onBlur: () => selectField(''),
		onFieldClick: () => {
			if (selectedField !== 'TravelersSelector') {
				selectField('TravelersSelector')
			}
			else {
				selectField('')
			}
		},
		onAdultsValueClick: selectAdults,
		onChildrenValueClick: selectChildren,
		onInfantsValueClick: selectInfants,
		isInlayDropdown: t999
	}

	const txtInfoBarConsist = l(`{consistCount, plural,
		one {{consistCount} человек}
		few {{consistCount} человека}
		many {{consistCount} человек}
	}`, { consistCount: consist.adults + consist.children + consist.infants })

	const renderInfoBar = () => {
		const propsInfoBar = {
			txtOutboundDate: outboundDate ? l.date(outboundDate) : l('Когда туда?'),
			txtInboundDate: inboundDate ? l.date(inboundDate) : l('Когда обратно?'),
			txtDepartureLocation: srcAutocompleteState.rawValue.title || l('Откуда?'),
			txtDestinationLocation: dstAutocompleteState.rawValue.title || l('Куда?'),
			txtConsist: txtInfoBarConsist,
			onClick: isOpened ? closeSearchBar : openSearchBar
		}

		return (
			<SearchInfoBar { ...propsInfoBar } />
		)
	}

	const searchBarClass = cx({
		[$.searchBarContainer]: !t999,
		[$.mobileSearchBarContainer]: t999
	})

	const renderSearchBar = () => (
		<div className={searchBarClass}>

			<div className={$.fieldWrapper}>
				<Autocomplete { ...propsDepartureAutocomplete } />
			</div>

			<div className={$.fieldWrapper}>
				<Autocomplete { ...propsDestinationAutocomplete } />
			</div>

			<div className={$.dateRangePickerWrapper}>
				<DateRangePicker { ...propsDateRangePicker } />
			</div>

			<div className={$.fieldWrapper}>
				<TravelersSelector
					ref={(comp) => { TravelersSelectorNode = ReactDOM.findDOMNode(comp) }}
					{ ...propsTravelersSelector }
				/>
			</div>

			<div className={$.searchBtnWrapper}>
				<SearchBtn onClick={handleSearchBtnClick} />
			</div>
		</div>
	)

	return (
		<div className={$.container}>
			{ t999 ? renderInfoBar() : null }
			{ ((t999 && isOpened) || !t999) ? renderSearchBar() : null }
		</div>
	)
}

export default enhancer(SearchBar)

