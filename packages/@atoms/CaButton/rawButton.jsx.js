import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import style from './styles/index.js'

const enhancer = createEnhancer({
	style: style(),
	withLang: false,
})

const RawCaButton = ({ $, ...props }) => {
	const {
		title,
		color,
		opacity,
		fontSize,
		fontWeight,
		decoration,
		border,

		borderStyle,
		backgroundColor,
		padding,

		hint,
		hintAlign,
		hintMargin,

		onClick,
		disabled
	} = props

	const inlineStyles = {
		color,
		opacity,
		fontSize,
		fontWeight,
		padding,
		border
	}

	const cx = makeCX()

	let baseContainerClass
	switch (backgroundColor) {
		case 'orange':
			baseContainerClass = disabled ? $.orangeDisabled : $.orange
			break
		case 'green':
			baseContainerClass = $.green
			break
		case 'lightGreen':
			baseContainerClass = $.lightGreen
			break
		case 'white':
			baseContainerClass = $.white
			break
		case 'gray':
			baseContainerClass = $.gray
			break
		default:
			baseContainerClass = $.container
	}
	const containerClass = cx(baseContainerClass, {
		[$.rounded]: borderStyle === 'rounded',
		[$.darkLineBottom]: borderStyle === 'darkLineBottom',
		[$.leftArrow]: borderStyle === 'leftArrow',
		[$.disabled]: disabled,
		[$.enabled]: !disabled
	})

	const titleClass = cx($.title, {
		[$.underline]: decoration === 'underline'
	})

	const renderHint = () => {
		const hintInlineStyle = {
			textAlign: hintAlign,
			margin: hintMargin
		}
		if (fontSize) {
			hintInlineStyle.fontSize = fontSize - 1
		}

		return <div className={$.hint} style={hintInlineStyle}>{hint}</div>
	}

	return (
		<a className={containerClass} style={inlineStyles} onClick={!disabled && onClick}>
			<div className={titleClass}>
				{title}
			</div>
			{hint && renderHint()}
		</a>
	)
}

export default enhancer(RawCaButton)
