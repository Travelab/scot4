import { createEnhancer } from '@utils/decoract'

import Dropdown from '@molecules/Dropdown'
import InputField from '@atoms/InputField'
import HoverList from '@atoms/HoverList'
import LoadingSpinner from '@atoms/LoadingSpinner'

import duck, { suggestionsStatusValue } from './ducks/index'
import style from './style'

const { NONE, REQUEST_LOADING, LOADING, LOADING_SUCCESS } = suggestionsStatusValue
const enhancer = createEnhancer({ duck, style, withLang: false })

const Autocomplete = ({ $, state, actions, args, ...props }) => {

	const { inputValue, hoveredSuggestionIdx, suggestions, suggestionsStatus } = state
	const {
		setValue,
		setRawValue,
		setHoveredSuggestionIdx,
		setSuggestionsStatus,
		requestSuggestionsLoading
	} = actions

	const {
		isActivated,
		isInvalid,
		placeholder,
		withSeparator,
		onFieldClick,
		onBlur,
		isInlayDropdown
	} = props

	const onBlurWrapper = () => {
		setSuggestionsStatus(NONE)
		onBlur()
	}

	const handleInputChange = (value) => {
		setValue(value)
		requestSuggestionsLoading()
	}

	const handleInputClick = () => {
		onFieldClick()

		if (inputValue.length) requestSuggestionsLoading()
	}

	const handleClearInput = () => {
		setValue('')
		setRawValue({})
		setHoveredSuggestionIdx(null)
	}

	const selectSuggestion = (idx) => {
		setHoveredSuggestionIdx(idx)
		setRawValue(suggestions[idx])
		setValue(suggestions[idx].title)
	}

	const handleKeyDown = (e) => {

		if (e.key != 'ArrowUp' && e.key != 'ArrowDown' && e.key != 'Enter' || !isSuggestionsOpen) return

		e.preventDefault()

		switch (e.key) {
			case 'ArrowUp': {
				if (hoveredSuggestionIdx === null) {
					selectSuggestion(suggestions.length - 1)
				}
				else {
					hoveredSuggestionIdx > 0
						? selectSuggestion(hoveredSuggestionIdx - 1)
						: selectSuggestion(suggestions.length - 1)
				}
				break;
			}
			case 'ArrowDown': {
				if (hoveredSuggestionIdx === null) {
					selectSuggestion(0)
				} else {
					hoveredSuggestionIdx < suggestions.length - 1
						? selectSuggestion(hoveredSuggestionIdx + 1)
						: selectSuggestion(0)
				}
				break;
			}
			case 'Enter': {
				setSuggestionsStatus(NONE) // close suggestions list
				break;
			}
		}
	}

	const isSuggestionsOpen = isActivated
		&& suggestionsStatus === LOADING_SUCCESS
		&& suggestions.length

	const isSuggestionsLoading = suggestionsStatus === LOADING

	const propsInputField = {
		value: inputValue,
		placeholder,
		isActivated,
		isInvalid: isInvalid && !inputValue,
		withSeparator,
		onClick: handleInputClick,
		onChange: handleInputChange,
		onKeyDown: handleKeyDown,
		onClearClick: handleClearInput
	}

	const propsHoverList = {
		items: suggestions.map((sug) => sug.title),
		hoveredItemIdx: hoveredSuggestionIdx,
		onItemHover: selectSuggestion,
		onItemClick: () => setSuggestionsStatus(NONE)
	}

	const dropdownFields = [
		{
			component: (
				<div className={$.inputWrapper}>
					<InputField { ...propsInputField } />
				</div>
			),
			isActivated: isActivated
		}
	]
	let dropdownBlock = null
	if (isSuggestionsOpen) dropdownBlock = (<HoverList { ...propsHoverList } />)
	else if (isSuggestionsLoading) {
		dropdownBlock = (
			<div className={$.loaderWrapper}>
				<div className={$.loader}>
					<LoadingSpinner/>
				</div>
			</div>
		)
	}

	const propsDropdown = {
		fields: dropdownFields,
		dropdownBlock,
		isInlayDropdown
	}

	return (
		<div className={$.container} tabIndex='1' onBlur={onBlurWrapper}>
			<Dropdown { ...propsDropdown } />
		</div>
	)
}

export default enhancer(Autocomplete)

