import { createEnhancer } from '@utils/decoract'
import Isvg from 'react-inlinesvg'

import style from './styles/index.js'
import clickavia from './images/clickavia.svg'
import aviasales from './images/aviasales.svg'

const enhancer = createEnhancer({
	style,
	withLang: false,
})

const ChannelLogo = ({ $, ...props }) => {
	const { channel } = props

	const logos = {
		clickavia,
		aviasales
	}

	if (!channel || !logos[channel]) return null

	return (
		<div className={$.container}>
			<Isvg src={logos[channel]}/>
		</div>
	)
}

export default enhancer(ChannelLogo)
