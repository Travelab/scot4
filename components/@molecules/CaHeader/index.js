import { createEnhancer } from '@utils/decoract'

import ChannelLogo from '@atoms/ChannelLogo'

import style from './styles/index.js'

const enhancer = createEnhancer({
	style,
	withLang: false,
})

const CaHeader = ({ $, ...props }) => {
	const { channel } = props
	let formattedChannel
	if (/aviasales/.test(channel)) {
		formattedChannel = 'aviasales'
	}
	else if (channel === 'clickavia' || channel === 'skyscanner') {
		formattedChannel = null
	}
	else {
		formattedChannel = channel
	}

	const renderDelimiter = () => <div className={$.plus}>+</div>
	return (
		<div className={$.container}>
			<ChannelLogo channel='clickavia'/>
			{formattedChannel && renderDelimiter()}
			<ChannelLogo channel={formattedChannel}/>
		</div>
	)
}

export default enhancer(CaHeader)
