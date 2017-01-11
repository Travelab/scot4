import { createEnhancer } from 'utils/decoract'

import style from './styles/index.js'

const enhancer = createEnhancer({
	style,
})

const QwertTt = ({ $, l }) => {

	// UI-text
	const txtExample = l('Example')

	return (
		<div></div>
	)
}

export default enhancer(QwertTt)