import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import Dropdown from '@molecules/Dropdown'
import IconicLabelField from '@atoms/IconicLabelField'
import ConsistSelector from '@atoms/ConsistSelector'

import style from './style'

import adultsIcon from './img/adult.svg'
import childrenIcon from './img/children.svg'
import infantsIcon from './img/baby.svg'

const cx = makeCX()
const enhancer = createEnhancer({ style, withLang: false })

const TravelersSelector = ({ $, ...props }) => {

	const {
		adultsValue,
		childrenValue,
		infantsValue,
		isActivated,
		isInlayDropdown,

		onBlur,
		onFieldClick,
		onAdultsValueClick,
		onChildrenValueClick,
		onInfantsValueClick
	} = props

	// prepare data for IconicLabelField
	const travelersItems = [
		{
			icon: adultsIcon,
			text: `${adultsValue}`
		},
		{
			icon: childrenIcon,
			text: `${childrenValue}`,
			iconHeightDiv: 2.4 // make childrenIcon smaller then adultIcon
		},
		{
			icon: infantsIcon,
			text: `${infantsValue}`,
			iconHeightDiv: 3 // make infantsIcon smaller then childrenIcon
		}
	]

	const propsConsistSelector = {
		adultsValue,
		childrenValue,
		infantsValue,
		onAdultsValueClick,
		onChildrenValueClick,
		onInfantsValueClick
	}

	const propsIconicLabelField = {
		items: travelersItems,
		isActivated: isActivated,
		onClick: onFieldClick
	}

	const dropdownFields = [
		{
			component: (<IconicLabelField { ...propsIconicLabelField } />),
			isActivated: isActivated
		}
	]
	const dropdownBlock = (<ConsistSelector { ...propsConsistSelector }/>)

	const propsDropdown = {
		fields: dropdownFields,
		dropdownBlock,
		isDropdownFloatWidth: !isInlayDropdown,
		isInlayDropdown
	}

	return (
		<div className={$.container} tabIndex='1' onBlur={onBlur}>
			<Dropdown { ...propsDropdown }/>
		</div>
	)
}

export default enhancer(TravelersSelector)

