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
		}

	},
	wrapper: {
		width: '100%',
		backgroundImage: `linear-gradient(to bottom,rgba(255,255,255,0),#d1d1d1 65%)`
	},
	header: {
		background: '#fff',
		height: 55,
		width: '100%',
		background: '#fff',
		margin: '0 auto'
	},
	contentWrapper: {
		width: '100%',
		maxWidth: 960,
		margin: '40px auto 0 auto'
	},
	promoBox: {
		display: 'flex',
		width: '100%'
	},
	promoDiv: {
		display: 'inline-block',
		zoom: 1,
		width: '50%',	
		verticalAlign: 'top',
		padding:  '0 100px 0 0',
		textShadow: {
			x: 0,
			y: 1,
			blur: 1,
			color: 'rgba(0,0,0,.5)'
		}
	},
	promoDivHow: {
		extend: 'promoDiv',
		width: '30%'
	},
	airlineTickets: {
		height: 65,
		paddingLeft: 40,
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
		transition: 'all .5s ease 0s',
		fontSize: 13,
		p: {
			margin: '0'
		}
	},
	price: {
		color: '#fff',
		width: 220,
		letterSpacing: '.3px',
		borderBottom: '1px solid #c2c2c2',
		textDecoration: 'none',
		fontSize: '18px',
		margin: '0 auto'
	},
	priceHow: {
		width: 220,
		margin: '10px auto'
	},
	directFlights: {
		letterSpacing: '-1.6px',
		color: '#fff',
		fontSize: '48px',
		'& p': {
			lineHeight: '50px'
		}
	},
	bold: {
		fontWeight: '700'
	},
	whereWeFly: {
		marginTop: '20px',
		textDecoration: 'underline',
		letterSpacing: '-.25px',
		cursor: 'pointer',
		color: '#fff',
		fontSize: '18px'
	},
	searchBox: {
		height: 120,
		marginTop: '20px',
		borderRadius: '5px',
		boxShadow: '0 4px 20px 0 rgba(0,0,0,.3)',
		fontSize: '0',
		background: '#fff'
	},
	mainFooter: {
		height: '190px',
		paddingTop: '80px',
		width: '100%',
		maxWidth: 960,
		margin: '0 auto',
		paddingBottom: '70px',
		position: 'relative',
		zIndex: '10',
		textShadow: {
			x: 0,
			y: 1,
			blur: 1,
			color: 'rgba(0,0,0,.5)'
		}
	},
	footerWrapper: {
		fontSize: '12px',
		margin: '0 auto',
		color: '#fff',
		display: 'flex'
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
		}
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
		}
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
		}
	}

}