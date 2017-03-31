import theme from 'themes/clickavia.js'

import mainContentStyle from './mainContent.js'
import failedOfferContentStyle from './failedOfferContent.js'
import loadingOfferContentStyle from './loadingOfferContent.js'
import unavailPopupStyle from './unavailPopup.js'
import changingConsistFailedPopupStyle from './changingConsistFailedPopup.js'
import changingConsistPendingPopupStyle from './changingConsistPendingPopup.js'
import paymentFailedPopupStyle from './paymentFailedPopup.js'
import paymentPendingPopupStyle from './paymentPendingPopup.js'

const netAviasalesColors = {
	background: '#01a5d4',
	color: 'white',
}
const skyscannerColors = {
	background: '#0a8ca6',
	color: 'white',
}
const momondoColors = {
	background: '#991555',
	color: 'white',
}
const defaultColors = {
	background: '#bee184',
	color: '#6b6b6b',
}

export default {
	container: {
		width: '100%',
		minHeight: '100vh',
		display: 'flex',
		justifyContent: 'center',
		background: '#ddd',
	},

	wrapper: {
		width: '100%',
		display: 'flex',
		flexFlow: 'column nowrap',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	t960Wrapper: {
		extend: 'wrapper',
		maxWidth: 768,
	},
	t768Wrapper: {
		extend: 'wrapper',
		justifyContent: 'flex-start',
		maxWidth: 414,
	},

	elementWrapper: {
		width: '100%',
		maxWidth: 960,
	},
	headerWrapper: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		background: theme.colors.headerBackground,
		padding: [ 10, 0 ],
		boxSizing: 'border-box',
	},
	f768t959HeaderWrapper: {
		extend: 'headerWrapper',
		paddingLeft: 8,
	},
	contentWrapper: {
		extend: 'elementWrapper',
		paddingTop: 27,
		boxSizing: 'border-box',
	},
	footerWrapper: {
		extend: 'elementWrapper',
		padding: [ 47, 0, 41, 0 ],
	},
	f768t959FooterWrapper: {
		extend: 'elementWrapper',
		boxSizing: 'border-box',
		padding: [ 24, 16 ],
	},

	netAviasalesColorsTheme: {
		...netAviasalesColors
	},
	skyscannerColorsTheme: {
		...skyscannerColors
	},
	momondoColorsTheme: {
		...momondoColors
	},
	defaultColorsTheme: {
		...defaultColors
	},

	...mainContentStyle,
	...failedOfferContentStyle,
	...loadingOfferContentStyle,
	...unavailPopupStyle,
	...changingConsistFailedPopupStyle,
	...changingConsistPendingPopupStyle,
	...paymentFailedPopupStyle,
	...paymentPendingPopupStyle,
}
