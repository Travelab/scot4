import { createEnhancer } from '@utils/decoract'
import Isvg from 'react-inlinesvg'

import style from './styles/index.js'
import imgClickavia from './images/clickavia.svg'
import imgAviasales from './images/aviasales.svg'
import imgMomondo from './images/momondo_logo.svg'

const enhancer = createEnhancer({
	style,
	withLang: false,
})

const ChannelLogo = ({ $, ...props }) => {
	const { channel } = props

	const logos = {
		clickavia: imgClickavia,
		aviasales: imgAviasales,
		momondo: imgMomondo,
	}

	if (!channel || !logos[channel]) return null

	return (
		<div className={$.container}>
			<img src={logos[channel]}/>
		</div>
	)
}

export default enhancer(ChannelLogo)
