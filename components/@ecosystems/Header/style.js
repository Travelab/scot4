const MOBILE_HEADER_HEIGHT = 50

export default {
	container: {
		width: '100%',
		height: '100%',
		transition: 'transform .5s',
		position: 'relative'
	},

	offsettedBySideMenu: {
		transform: 'translateX(250px)'
	},

	overlay: {
		height: '100%',
		width: '100%',
		position: 'absolute',
		background: 'rgba(0, 0, 0, 0.4)',
		zIndex: 999999999
	},

	headerContainer: {
		display: 'flex',
		flexFlow: 'row wrap',
		width: '100%',
		backgroundColor: '#373a43',
		justifyContent: 'center'
	},

	mobileMenuBtnWrapper: {
		height: '100%',
		padding: [0, 15],
		borderRight: {
			width: 1,
			style: 'solid',
			color: '#848484',
		}
	},

	wrapper: {
		display: 'flex',
		flexFlow: 'column nowrap',
		justifyContent: 'center',
		alignItems: 'stretch',
		width: '100%',
		maxWidth: '1170px'
	},

	mobileWrapper: {
		display: 'flex',
		flexFlow: 'row wrap',
		width: '100%',
		height: MOBILE_HEADER_HEIGHT,
		flexWrap: 'nowrap',
		position: 'relative',
		background: '#373a43',
		color: 'white'
	},

	commonInfoWrapper: {
		width: '100%'
	},

	mobileCommonInfoWrapper: {
		width: 250,
		position: 'fixed',
		top: 0,
		left: -250,
		bottom: 0,
		background: '#373a43',
		boxSizing: 'border-box',
		overflowX: 'hidden',
	},

	childrenWrapper: {
		width: '100%',
		'& > div': {
			width: '100%',
			height: '100%'
		}
	},
}

