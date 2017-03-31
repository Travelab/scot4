import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import style from './styles/index.js'

const cx = makeCX()
const enhancer = createEnhancer({
	style,
	withLang: false,
})

const Dropdown = ({ $, ...props }) => {

	// Properties
	const {
		fields,
		dropdownBlock,
		isDropdownFloatWidth,
		withoutBorders,
		withoutBackground,
		isInlayDropdown
	} = props

	const wrappedFields = fields.map((field, i) => (
		<div className={$.wrappedField} key={i}>
			{ field.component }
		</div>
	))

	const isActivated = fields.some((field) => field.isActivated)

	const dropdownBlockClass = cx({
		[$.dropdownBlockWrapper]: true,
		[$.dropdownBlockWidthByChild]: isDropdownFloatWidth,
		[$.dropdownBlockInlay]: isInlayDropdown,
		[$.dropdownBlockBorderBottom]: !withoutBorders,
		[$.dropdownBlockBackground]: !withoutBackground
	})

	const renderDropdownBlock = () => (
		<div className={dropdownBlockClass}>
			{ dropdownBlock }
		</div>
	)

	const fieldsWrapperClass = cx({
		[$.fieldsWrapper]: true,
		[$.borderBottomField]: isInlayDropdown && !withoutBorders
	})

	return (
		<div className={$.container}>
			<div className={fieldsWrapperClass}>
				{ wrappedFields }
			</div>
			{ isActivated && dropdownBlock ? renderDropdownBlock() : null }
		</div>
	)
}

export default enhancer(Dropdown)
