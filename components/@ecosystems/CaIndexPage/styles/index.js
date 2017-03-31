import wall from '../wall.jpg'

export default {

	container: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		backgroundImage: `url(${wall})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center bottom',
		backgroundColor: 'c2c2c2',
		minHeight: '100%',
		'& p, h4': {
			marginTop: 0,
			marginBottom: 0
		},
	},
	wrapper: {
		width: '100%',
		backgroundImage: `linear-gradient(to bottom,rgba(255,255,255,0),#d1d1d1 65%)`,
	},
	header: {
		background: '#fff',
		height: 55,
		width: '100%',
		background: '#fff',
		margin: {
			top: 0,
			right: 'auto',
			bottom: 0,
			left: 'auto'
		},
	},
	contentWrapper: {
		width: '100%',
		maxWidth: 1024,
		margin: {
			top: 40,
			right: 'auto',
			bottom: 0,
			left: 'auto'
		},
	},
	promoBox: {
		display: 'flex',
		width: '100%',
	},
	mediumPromoBox: {
		extend: 'promoBox',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	promoDiv: {
		display: 'inline-block',
		zoom: 1,	
		verticalAlign: 'top',
		padding: {
			top: 0,
			right: '5%',
			bottom: 0,
			left: '5%'
		},
		textShadow: {
			x: 0,
			y: 1,
			blur: 1,
			color: 'rgba(0,0,0,.5)'
		},
	},
	promoDivHow: {
		extend: 'promoDiv',
		width: '40%',
	},
	mediumPromoDivHow: {
		extend: 'promoDivHow',
		width: '85%',
	},
	promoDivDirects: {
		extend: 'promoDiv',
		width: '50%',
	},
	mediumPromoDivDirects: {
		extend: 'promoDivDirects',
		width: '85%',
		marginTop: 20,
	},
	airlineTickets: {
		height: 65,
		paddingLeft: '10%',
		color: '#fff',
		letterSpacing: 0.2,
		fontSize: 18,
		lineHeight: '18px'
	},
	italic: {
		fontStyle: 'italic'
	},
	howItWorks: {
		marginTop: 35,
		paddingTop: 10,
		paddingLeft: 10,
		paddingBottom: 10,
		color: '#eee',
		backgroundColor: 'rgba(0,0,0,.3)',
		cursor: 'pointer',
		lineHeight: '20px',
		letterSpacing: 0.1,
		boxShadow: {
			x: 0,
			y: 0,
			blur: '0',
			spread: 1,
			color: '#c2c2c2'
		},
		borderRadius: 40,
		transition: {
			property: 'all',
			duration: '.5s',
			timingFunction: 'ease',
			delay: '0s'
		},
		fontSize: 13,
		p: {
			margin: 0
		},
	},
	mediumHowItWorks: {
		extend: 'howItWorks',
		marginTop: 0,
		marginBottom: 10,
	},
	price: {
		color: '#fff',
		width: 220,
		letterSpacing: 0.3,
		borderBottom: {
			width: 1,
			style: 'solid',
			color: '#c2c2c2'
		},
		textDecoration: 'none',
		fontSize: 18,
		margin: {
			top: 0,
			right: 'auto',
			bottom: 0,
			left: 'auto'
		},
	},
	priceHow: {
		width: 220,
		margin: {
			top: 10,
			right: 'auto',
			bottom: 10,
			left: 'auto'
		},
	},
	directFlights: {
		letterSpacing: -1.6,
		color: '#fff',
		fontSize: 48,
		'& p': {
			lineHeight: '50px'
		},
	},
	mediumDirectFlights: {
		letterSpacing: -1.6,
		color: '#fff',
		fontSize: 38,
		'& p': {
			lineHeight: '40px'
		},
	},
	bold: {
		fontWeight: '700',
	},
	whereWeFly: {
		marginTop: 20,
		textDecoration: 'underline',
		letterSpacing:-0.25,
		cursor: 'pointer',
		color: '#fff',
		fontSize: 18,
	},
	searchBox: {
		marginTop: 20,
		borderRadius: 5,
		boxShadow: {
			x: 0,
			y: 4,
			blur: 20,
			spread: null,
			color: 'rgba(0,0,0,.3)'
		},
		background: '#fff',
	},
	mainFooter: {
		paddingTop: 80,
		width: '90%',
		maxWidth: 960,
		margin: {
			top: 0,
			right: 'auto',
			bottom: 0,
			left: 'auto'
		},
		paddingBottom: 70,
		position: 'relative',
		zIndex: 9,
		textShadow: {
			x: 0,
			y: 1,
			blur: 1,
			color: 'rgba(0,0,0,.5)'
		},
	},
	mediumMainFooter: {
		extend: 'mainFooter',
		paddingTop: 30,
	},
	footerWrapper: {
		fontSize: 12,
		margin: {
			top: 0,
			right: 'auto',
			bottom: 0,
			left: 'auto'
		},
		color: '#fff',
		display: 'flex',
		flexWrap: 'wrap',
	},
	menuBox: {
		'& a': {
			textDecoration: 'underline',
			color: '#fff'
		},
		'& ul': {
			listStyle: 'none',
			display: 'flex',
			flexWrap: 'wrap',
			padding: 0
		},
		'& li': {
			zoom: 1,
			vertivalAlign: 'top',
			fontSize: 12,
			marginBottom: 13
		},
	},
	first: {
		extend: 'menuBox',
		width: '70%',
		'& h4': {
			fontSize: 14,
			marginBottom: 15
		},
		'& li': {
			width: 105
		},
	},
	second: {
		extend: 'menuBox',
		width: '30%',
		'& h4 a': {
			textDecoration: 'none',
		},
		'& h4 a:hover': {
			textDecoration: 'underline',
		},
		'& li': {
			width: '100%'
		},
	},
	smallFirst: {
		extend: 'first',
		width: '100%',
		'& h4': {
			fontSize: 14,
			marginBottom: 15
		},
		'& li': {
			width: '33.333333%'
		},
	},
	smallSecond: {
		extend: 'second',
		width: '100%',
		'& h4 a': {
			textDecoration: 'none',
		},
		'& h4 a:hover': {
			textDecoration: 'underline',
		},
		'& li': {
			width: '100%'
		},
	},
	footerCopyright: {
		extend: 'footerWrapper',
		paddingTop: 16,
		height: 50,
		width: '100%',
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		'& a': {
			textDecoration: 'underline',
			color: '#fff'
		},
	}

}