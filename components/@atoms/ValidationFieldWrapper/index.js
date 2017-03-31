import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import style from './styles/index.js'

const cx = makeCX()
const enhancer = createEnhancer({
	style,
	withLang: false,
})

const ValidationFieldWrapper = ({ $, ...props }) => {

	// Properties
	const { children, isTouched, isInvalid, errorMsg, withoutMsg } = props

	const renderErrorMsg = () => (
		<div className={$.errorMsg}>
			{ errorMsg }
		</div>
	)

	const childrenWrapperClass = cx({
		[$.defaultChildrenWrapper]: !isTouched,
		[$.validChildrenWrapper]: !isInvalid && isTouched,
		[$.invalidChildrenWrapper]: isInvalid && isTouched
	})

	return (
		<div className={$.container}>
			<div className={childrenWrapperClass}>
				{ children }
			</div>
			{ isInvalid && isTouched && !withoutMsg ? renderErrorMsg() : null }
		</div>
	)
}

export default enhancer(ValidationFieldWrapper)
