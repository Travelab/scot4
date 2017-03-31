import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import HeaderNavigation from '@molecules/HeaderNavigation'

import style from './styles/index.js'

import travelabLogo from './img/travelab_logo.svg'

const cq = {
	t250: {
		maxWidth: 250
	}
}
const cx = makeCX()
const enhancer = createEnhancer({
	cq,
	style,
})

const HeaderCommonInfo = ({ $, l, cq }) => {

	const { t250 } = cq

	// UI-text
	const txtPhoneNumber = l('+7 495 646-25-52')
	const txtWorkTime = l('круглосуточно')

	const containerClass = cx({
		[$.container]: !t250,
		[$.mobileContainer]: t250
	})
	const logoWrapperClass = cx({
		[$.logoWrapper]: t250
	})
	const navAndPhoneWrapperClass = cx({
		[$.navAndPhoneWrapper]: !t250,
		[$.mobileNavAndPhoneWrapper]: t250
	})

	return (
		<div className={containerClass}>
			<div className={logoWrapperClass}>
				<img className={$.logo} src={travelabLogo} alt='travelab'/>
			</div>
			
			<div className={navAndPhoneWrapperClass}>
				<div className={$.navWrapper}>
					<HeaderNavigation isVertical={t250}/>
				</div>
				
				<div className={$.contactPhone}>
					<span className={$.phoneNumber}>{ txtPhoneNumber }</span>
					<span className={$.workTime}>{ txtWorkTime }</span>
				</div>
			</div>
		</div>
	)
}

export default enhancer(HeaderCommonInfo)
