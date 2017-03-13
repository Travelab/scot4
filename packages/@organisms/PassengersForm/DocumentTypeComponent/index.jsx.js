import { createEnhancer } from '@utils/decoract'

import InputField from '@atoms/InputField'
import HoverList from '@atoms/HoverList'
import Dropdown from '@molecules/Dropdown'
import ValidationFieldWrapper from '@atoms/ValidationFieldWrapper'
import FormField from '@molecules/FormField'

import style from './style.js'

const enhancer = createEnhancer({
	style,
})

const DocumentTypeComponent = ({ $, l, ...props }) => {

	const {
		value,
		types,
		hoveredIdx,
		isActivated,
		isTouched,
		t414,
		onClick,
		onSelect,
		onBlur,
		setHoveredIdx,
		setCode
	} = props

	const handleTypeHover = (idx) => {
		setHoveredIdx(idx)
		onSelect(types[idx])
	}
	const handleTypeClick = () => {
		setCode(value)
		onBlur()
	}

	const propsInputField = {
		value,
		onClick,
		onBlur: handleTypeClick,
		readOnly: true
	}

	const propsValidationFieldWrapper = {
		isTouched,
		isInvalid: false,
		errorMsg: ''
	}

	const renderFieldWithArrow = () => (
		<ValidationFieldWrapper { ...propsValidationFieldWrapper }>
			<div className={$.fieldWithDownArrow} onClick={onClick}>
				<InputField { ...propsInputField } />
			</div>
		</ValidationFieldWrapper>
	)
	const dropdownFields = [
		{
			component: renderFieldWithArrow(),
			isActivated: isActivated
		}
	]

	const propsHoverList = {
		items: types,
		hoveredItemIdx: hoveredIdx,
		fontSize: t414 ? 13 : 16,
		onItemHover: handleTypeHover,
		onItemClick: handleTypeClick
	}
	const dropdownBlock = (<HoverList { ...propsHoverList } />)

	const propsDropdown = {
		fields: dropdownFields,
		dropdownBlock,
		isInlayDropdown: t414,
		withoutBorders: true
	}

	const label = <div className={!t414 ? $.label : null}>{l('Тип документа')}</div>

	return (
		<div className={$.container} tabIndex={1} onBlur={onBlur}>
			<FormField label={label}>
				<Dropdown { ...propsDropdown } />
			</FormField>
		</div>
	)
}

export default enhancer(DocumentTypeComponent)
