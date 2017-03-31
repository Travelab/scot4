import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import CaHeader from '@molecules/CaHeader'
import CaFooter from '@atoms/CaFooter'

import Content from './content.jsx.js'
import PopUp from './popup.jsx.js'

import style from '../styles/index.js'

const cq = {
	f768t959: {
		minWidth: 768,
		maxWidth: 959
	},
	f960: {
		minWidth: 960
	}
}
const cx = makeCX()

const enhancer = createEnhancer({ style, cq })

const PageView = ({ $, cq, l, ditch, ...props }) => {

	const { f768t959, f960 } = cq
	const {
		contentType,
		popUpType,
		offer,
		channel,
		order,
		paymentProcessing,
		actions
	} = props
	const meta = { $, f960, l, ditch }

	const propsContent = {
		type: contentType,
		channel,
		offer,
		order,
		paymentProcessing,
		meta
	}

	const themeByChannel = {
		'net_aviasales': $.netAviasalesColorsTheme,
		'skyscanner': $.skyscannerColorsTheme,
		'momondo': $.momondoColorsTheme,
	}
	const theme = (channel && themeByChannel[channel]) || $.defaultColorsTheme

	const headerClass = (f960 && !f768t959) ? $.headerWrapper : $.f768t959HeaderWrapper
	const WrappedHeader = () => (
		<div className={headerClass}>
			<div className={$.elementWrapper}>
				<CaHeader channel={channel}/>
			</div>
		</div>
	)
	const WrappedContent = () => (
		<div className={$.contentWrapper}>
			<Content {...propsContent}/>
		</div>
	)
	let WrappedFooter = () => null
	const footerClass = (f960 && !f768t959) ? $.footerWrapper : $.f768t959FooterWrapper
	if (f960 || f768t959) WrappedFooter = () => (
		<div className={footerClass}>
			<CaFooter/>
		</div>
	)

	const wrapperClass = cx({
		[$.wrapper]: f960,
		[$.t960Wrapper]: f768t959,
		[$.t768Wrapper]: !f768t959 && !f960
	}, theme)

	const propsPopUp = {
		...actions,
		meta,
		type: popUpType
	}

	return (
		<div className={$.container}>
			<div className={wrapperClass}>
				<WrappedHeader/>
				<WrappedContent/>
				<WrappedFooter/>
				<PopUp {...propsPopUp}/>
			</div>
		</div>
	)
}

export default enhancer(PageView)
