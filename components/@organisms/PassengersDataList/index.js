import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import PassengersForm from '@organisms/PassengersForm'
import Button from '@atoms/CaButton'
import OverlayWrapper from '@molecules/OverlayWrapper'
import CaConsistSelector from '@molecules/CaConsistSelector'

import duck from './ducks/index.js'
import style from './styles/index.js'

const cx = makeCX()
const cq = {
	t414: {
		maxWidth: 414
	},
	f415t768: {
		minWidth: 415,
		maxWidth: 768
	},
}

const enhancer = createEnhancer({
	duck,
	style,
	cq
})

const PassengersDataList = ({ $, l, cq, state, actions, ditch }) => {
	const { t414, f415t768 } = cq

	const passengersFormsDitch = ditch.getDitch('passengersForms')

	// Duck's state decomposition
	const {
		adults,
		children,
		infants,
		isConsistSelectorOpened,
	} = state

	// Duck's actions decomposition
	const {
		setAdults,
		setChildren,
		setInfants,
		openConsistSelector,
		closeConsistSelector,
		confirmChangeConsist,
	} = actions

	const txtAddingBtn = l('Изменить количество пассажиров')

	const propsAddBtn = {
		title: txtAddingBtn,
		type: 'dashedTransparent',
		onClick: openConsistSelector
	}

	const propsConsistSelector = {
		adults: {
			value: adults,
			onIncrement: () => setAdults(adults + 1),
			onDecrement: () => setAdults(adults - 1),
		},
		children: {
			value: children,
			onIncrement: () => setChildren(children + 1),
			onDecrement: () => setChildren(children - 1),
		},
		infants: {
			value: infants,
			onIncrement: () => setInfants(infants + 1),
			onDecrement: () => setInfants(infants - 1),
		},
		onConfirm: () => {
			confirmChangeConsist([ adults, children, infants ])
			closeConsistSelector()
		},
	}

	const ConsistSelector = () => (
		<OverlayWrapper width={!t414 ? 280 : null} onClose={closeConsistSelector}>
			<CaConsistSelector {...propsConsistSelector}/>
		</OverlayWrapper>
	)

	const formListItemClass = cx({
		[$.formListItem]: !t414 && !f415t768,
		[$.t414FormListItem]: t414 || f415t768
	})
	const formWrapperClass = cx({
		[$.formWrapper]: !t414 && !f415t768,
		[$.t414FormWrapper]: t414 || f415t768
	})

	const renderFormListItem = (ditch, index, category) => (
		<div className={formListItemClass} key={index}>
			<div className={formWrapperClass}>
				<PassengersForm ditch={ditch} formName={`form.${index}`}/>
			</div>
		</div>
	)

	let formsList = []

	const extraState = passengersFormsDitch.getState(state)
	passengersFormsDitch.ditches.forEach((formDitch, i) => {
		if (formDitch === undefined || extraState[i] === undefined) return

		const { category } = extraState[i]
		formsList.push(renderFormListItem(formDitch, i, category))
	})

	const AddBtn = () => (
		<div className={$.addBtn}>
			<Button {...propsAddBtn}/>
		</div>
	)

	const Controls = isConsistSelectorOpened ? ConsistSelector : AddBtn

	return (
		<div className={$.container}>
			<div className={$.formsList}>
				{ formsList }
			</div>
			<div className={$.addingControls}>
				<Controls/>
			</div>
		</div>
	)
}

export default enhancer(PassengersDataList)
