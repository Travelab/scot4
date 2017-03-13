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
	}
}

const enhancer = createEnhancer({
	duck,
	style,
	cq
})

const PassengersDataList = ({ $, l, cq, state, actions, ditch }) => {
	const { t414 } = cq

	const passengersFormsDitch = ditch.getDitch('passengersForms')

	// Duck's state decomposition
	const {
		adults,
		children,
		infants,
		isConsistSelectorOpened,
		canAddPassenger,
		canRemovePassenger
	} = state

	// Duck's actions decomposition
	const {
		addAdults,
		addChildren,
		addInfants,
		removeAdult,
		removeChild,
		removeInfant,
		openConsistSelector,
		closeConsistSelector,
	} = actions

	const addingText = l('Добавить еще пассажира:')

	const propsAddAdultBtn = {
		title: l('Взрослый'),
		hint: l.currency(13425, 'RUB'),
		type: 'gray',
		onClick: () => addAdults(1)
	}

	const propsAddChildBtn = {
		title: l('Ребенок (от 2-х до 14 лет)'),
		hint: l.currency(13425, 'RUB'),
		type: 'gray',
		onClick: () => addChildren(1)
	}

	const propsAddInfantBtn = {
		title: l('Младенец (до 2-х лет, без места)'),
		hint: l.currency(3650, 'RUB'),
		type: 'gray',
		onClick: () => addInfants(1)
	}

	const propsT414AddBtn = {
		title: l('Изменить количество пассажиров'),
		type: 'dashedTransparent',
		onClick: openConsistSelector
	}

	const propsConsistSelector = {
		adults: {
			value: adults,
			onIncrement: () => addAdults(1),
			onDecrement: removeAdult,
		},
		children: {
			value: children,
			onIncrement: () => addChildren(1),
			onDecrement: removeChild,
		},
		infants: {
			value: infants,
			onIncrement: () => addInfants(1),
			onDecrement: removeInfant,
		},
		onConfirm: closeConsistSelector,
	}

	const renderConsistSelector = () => (
		<OverlayWrapper onClose={closeConsistSelector}>
			<CaConsistSelector { ...propsConsistSelector }/>
		</OverlayWrapper>
	)

	const handleRemoveClick = (category) => {
		switch (category) {
			case 'adult':
				removeAdult()
				break
			case 'child':
				removeChild()
				break
			case 'infant':
				removeInfant()
				break
			default:
				break
		}
	}

	const renderRemoveBtn = (category) => (
		<div className={$.removeBtn} onClick={() => handleRemoveClick(category)}>
			{ l('Убрать пассажира') }
		</div>
	)

	const formListItemClass = cx({
		[$.formListItem]: !t414,
		[$.t414FormListItem]: t414
	})
	const formWrapperClass = cx({
		[$.formWrapper]: !t414,
		[$.t414FormWrapper]: t414
	})

	const renderFormListItem = (ditch, index, category, isLastForm) => (
		<div className={formListItemClass} key={index}>
			<div className={formWrapperClass}>
				<PassengersForm ditch={ditch} formName={`form.${index}`}/>
			</div>
			{ isLastForm && canRemovePassenger && !t414 ? renderRemoveBtn(category) : null }
		</div>
	)

	let formsList = []

	const paxCount = adults + children + infants

	const extraState = passengersFormsDitch.getState(state)
	let formsIndex = 0
	passengersFormsDitch.ditches.forEach((formDitch, i) => {
		if (formDitch === undefined || extraState[i] === undefined) return

		const { category } = extraState[i]
		const isLastForm = formsIndex === paxCount - 1
		formsList.push(renderFormListItem(formDitch, i, category, isLastForm))
		++formsIndex
	})

	const renderF414Layout = () => (
		<div className={$.container}>
			<div className={$.formsList}>
				{ formsList }
			</div>
			<div className={$.addingControls}>
				<div className={$.addingText}>
					<b>{addingText}</b>
				</div>
				<div className={$.addAdultBtn}>
					<Button { ...propsAddAdultBtn }/>
				</div>
				<div className={$.addChildBtn}>
					<Button { ...propsAddChildBtn }/>
				</div>
				<div className={$.addInfantBtn}>
					<Button { ...propsAddInfantBtn }/>
				</div>
			</div>
		</div>
	)

	const renderT414AddBtn = () => (
		<div className={$.t414AddBtn}>
			<Button { ...propsT414AddBtn } />
		</div>
	)

	const renderT414Layout = () => (
		<div className={$.container}>
			<div className={$.formsList}>
				{ formsList }
			</div>
			<div className={$.t414AddingControls}>
				{
					isConsistSelectorOpened
						? renderConsistSelector()
						: renderT414AddBtn()
				}
			</div>
		</div>
	)

	return t414 ? renderT414Layout() : renderF414Layout()
}

export default enhancer(PassengersDataList)
