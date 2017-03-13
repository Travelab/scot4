import { createEnhancer } from '@utils/decoract'

import style from './styles/index.js'

const cq = {
	t959: {
		maxWidth: 959
	}
}
const enhancer = createEnhancer({
	style,
	withLang: false,
	cq
})

const OverlayWrapper = ({ $, cq, ...props }) => {

	const { t959 } = cq
	// Properties
	const { children, onClose } = props

	const wrapperClass = t959 ? $.t959Wrapper : $.wrapper

	return (
		<div className={$.container}>
			<div className={wrapperClass}>
				<div className={$.childrenWrapper}>
					{ children }
				</div>
				{ onClose ? <div className={$.closeBtn} onClick={onClose}/> : null }
			</div>
		</div>
	)
}

export default enhancer(OverlayWrapper)
