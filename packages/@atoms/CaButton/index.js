import { createEnhancer } from '@utils/decoract'

import RawCaButton from './rawButton.jsx.js'

const enhancer = createEnhancer({
	withLang: false,
})

const CaButton = ({ $, ...props }) => {
	const {
		title,
		hint,
		type,
		disabled,
		onClick
	} = props

	let propsBtn
	switch (type) {
		case 'whiteUnderline':
			propsBtn = {
				color: 'white',
				fontSize: 18,
				decoration: 'underline',
				opacity: 0.9,
			}
			break
		case 'leftArrow':
			propsBtn = {
				color: 'white',
				fontSize: 18,
				borderStyle: 'leftArrow',
				backgroundColor: 'blue',
				opacity: 0.9,
			}
			break
		case 'bigOrange':
			propsBtn = {
				color: 'white',
				fontSize: 32,
				fontWeight: 'bold',
				backgroundColor: 'orange',
				borderStyle: 'rounded',
				padding: '10px 0'
			}
			break
		case 'bigMobileOrange':
			propsBtn = {
				color: 'white',
				fontSize: 25,
				fontWeight: 'bold',
				backgroundColor: 'orange',
				borderStyle: 'rounded',
				padding: '10px 0'
			}
			break
		case 'bigMobileGreen':
			propsBtn = {
				color: 'white',
				fontSize: 14,
				backgroundColor: 'green',
				padding: '14px 0'
			}
			break
		case 'green':
			propsBtn = {
				color: 'white',
				backgroundColor: 'green',
				padding: '14px 16px 12px 16px',
				borderStyle: 'darkLineBottom'
			}
			break
		case 'lightGreen':
			propsBtn = {
				backgroundColor: 'lightGreen',
				padding: '14px 16px 16px 16px'
			}
			break
		case 'dashedTransparent':
			propsBtn = {
				color: '#363636',
				fontSize: 17,
				background: 'transparent',
				borderStyle: 'rounded',
				padding: '15px 0',
				border: '2px dashed #969696'
			}
			break
		case 'gray':
			propsBtn = {
				color: '#777777',
				fontSize: 13,

				backgroundColor: 'gray',
				borderStyle: 'rounded',
				padding: '6px 0',

				hintAlign: 'left',
				hintMargin: '0 0 0 20px'
			}
			break
		case 'successForm':
			propsBtn = {
				backgroundColor: 'white',
				padding: '16px 32px'
			}
			break
		default:
			propsBtn = {}
	}

	return <RawCaButton title={title} hint={hint} onClick={onClick} disabled={disabled} {...propsBtn}/>
}

export default enhancer(CaButton)
