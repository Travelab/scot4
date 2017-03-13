import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import style from './style'

const itemHeight = 60
const enhancer = createEnhancer({
	style: style({ itemHeight }),
	withLang: false
})

const IconicLabelField = ({ $, ...props }) => {

	const { items, isActivated, isInvalid, withSeparator, onClick } = props

	const itemsComponents = items.map(({ icon, text, iconHeightDiv }, i) => {

		const iconHeight = iconHeightDiv ? itemHeight / iconHeightDiv : null
		const iconStyle = { height: iconHeight }

		return (
			<div key={i} className={$.item} onClick={() => onClick()}>
				<img style={iconStyle} src={icon} alt='icon'/>
				<span>{text}</span>
			</div>
		)
	})

	const cx = makeCX()

	let containerClass = cx({
		[$.container]: true,
		[$.containerWithSeparator]: withSeparator,
		[$.invalidContainer]: !isActivated && isInvalid
	})

	// disable classes for activated container
	/*if (isActivated) {

		containerClass = $.activatedContainer

	} else*//* if (withSeparator) {

		containerClass = $.containerWithSeparator
	}*/


	return (
		<div className={containerClass}>
			{ itemsComponents }
		</div>
	)
}

export default enhancer(IconicLabelField)

