import { createEnhancer } from '@utils/decoract'

import style from './styles/index.js'

const enhancer = createEnhancer({
	style,
	withLang: false,
})

const FormField = ({ $, ...props }) => {

	// Properties
	const { label, children } = props

	return (
		<div className={$.container}>
			<div className={$.labelWrapper}>
				{ label }
			</div>
			<div className={$.childrenWrapper}>
				{ children }
			</div>
		</div>
	)
}

export default enhancer(FormField)
