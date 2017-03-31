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

const Citizenship = ({ $, l, ...props }) => {

	const {
		inputValue,
		hoveredIdx,
		code,
		filteredCitizenships,
		isActivated,
		isTouched,
		isValid,
		errorMsg,
		t414,
		onClick,
		onBlur,
		setInputValue,
		filterCitizenships,
		setHoveredIdx
	} = props

	const handleInputChange = (value) => {
		if (!isActivated) onClick() // activate field
		setInputValue(value)
		setHoveredIdx(null)
		filterCitizenships(value)
	}
	const handleKeyDown = (e) => {
		if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Enter') return

		e.preventDefault()

		switch (e.key) {
			case 'ArrowUp': {
				if (!hoveredIdx) handleCitizenshipHover(filteredCitizenships.length - 1)
				else handleCitizenshipHover(hoveredIdx - 1)
				break
			}
			case 'ArrowDown': {
				if (hoveredIdx === null || hoveredIdx >= filteredCitizenships.length - 1) {
					handleCitizenshipHover(0)
				}
				else handleCitizenshipHover(hoveredIdx + 1)
				break
			}
			case 'Enter': {
				onBlur()
			}
		}
	}

	const handleCitizenshipHover = (idx) => {
		setHoveredIdx(idx)
		setInputValue(filteredCitizenships[idx])
	}
	const handleCitizenshipClick = () => {
		onBlur()
	}

	const propsInputField = {
		value: inputValue,
		placeholder: '',
		onClick,
		onBlur,
		onChange: handleInputChange,
		onKeyDown: handleKeyDown
	}

	const label = <div className={!t414 ? $.label : null}>{l('Гражданство')}</div>
	const propsValidationFieldWrapper = {
		isTouched,
		isInvalid: !isValid,
		errorMsg,
		withoutMsg: t414
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
		items: filteredCitizenships,
		hoveredItemIdx: hoveredIdx,
		fontSize: t414 ? 13 : 16,
		onItemHover: handleCitizenshipHover,
		onItemClick: handleCitizenshipClick
	}
	const dropdownBlock = (<HoverList { ...propsHoverList } />)

	const propsDropdown = {
		fields: dropdownFields,
		dropdownBlock,
		isInlayDropdown: t414,
		withoutBorders: true
	}

	return (
		<div className={$.container} tabIndex={1} onBlur={onBlur}>
			<FormField label={label}>
				<Dropdown { ...propsDropdown } />
			</FormField>
		</div>
	)
}

export default enhancer(Citizenship)
