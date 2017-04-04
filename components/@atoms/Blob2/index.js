import { createEnhancer } from '@utils/decoract'

import style from './styles/index.js'

const cq = {
	f320t1024: {
		minWidth: 320,
		maxWidth: 1024,
	}
}

const enhancer = createEnhancer({
	cq,
	style,
})

const Blob2 = ({ $, cq, l }) => {

	// Component Query decomposition
	const { f320t1024 } = cq

	// UI-text
	const txtExample = l('Example')

	return (
		<div className={$.container}></div>
	)
}

export default enhancer(Blob2)