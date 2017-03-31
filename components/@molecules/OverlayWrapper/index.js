import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'
import React from 'react'

import style from './styles/index.js'

const cx = makeCX()
const cq = {
	f768t959: {
		minWidth: 768,
		maxWidth: 959
	},
	f960: {
		minWidth: 960
	},
}
const enhancer = createEnhancer({
	style,
	withLang: false,
	cq
})

const OverlayWrapper = ({ $, cq, ...props }) => {

	const { f768t959, f960 } = cq
	// Properties
	const { children, width, height, onClose } = props

	const wrapperClass = cx({
		[$.wrapper]: f960,
		[$.f768t959Wrapper]: f768t959,
		[$.t768Wrapper]: !f960 && !f768t959
	})
	const wrapperStyles = { width, height }

	return (
		<div className={$.container}>
			<div className={wrapperClass} style={wrapperStyles}>
				<div className={$.childrenWrapper}>
					{children}
				</div>
				{ onClose ? <div className={$.closeBtn} onClick={onClose}/> : null }
			</div>
		</div>
	)
}

export default enhancer(OverlayWrapper)
