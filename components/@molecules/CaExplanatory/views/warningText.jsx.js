import { createEnhancer } from '@utils/decoract'

import icoWarning from '../images/warning.svg'

import style from '../styles/warningText.js'

const enhancer = createEnhancer({ style, withLang: false })

const WarningText = ({ $, children }) => (
	<div className={$.warningContainer}>
		<div className={$.warningIcon}>
			<img src={icoWarning}/>
		</div>
		<div className={$.warningText}>
			{children}
		</div>
	</div>
)

export default enhancer(WarningText)
