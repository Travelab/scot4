const MAX_MOBILE_WIDTH = 414

export default {

	container: {
		display: 'flex',
		flexFlow: 'row wrap',
		width: '100%',
		height: '100vh',
		justifyContent: 'center',
		background: '#b5b5b5'
	},

	wrapper: {
		width: '100%',
		height: '100%',
	},

	mobileWrapper: {
		background: '#f0f0f0',
		width: '100%',
		height: '100%',
		maxWidth: MAX_MOBILE_WIDTH
	},

	// for div created by StickyContainer
	nonScrollableY: {
		'& > div': {
			overflowY: 'hidden',
			width: '100%',
			height: '100%',
			position: 'relative'
		}
	},

	headerWrapper: {
		height: '100%',
		width: '100%',
	},

	filtersWrapper: {
		width: '100%',
	},

	searchResultsWrapper: {
		width: '100%',
	},

	scrollable: {
		width: '100%',
		height: '100%',
		overflowX: 'hidden',
		overflowY: 'auto'
	},

	circleBtn: {
		zIndex: 9999,
		position: 'absolute',
		width: 60,
		height: 60,
	},

	filtersBtn: {
		extend: 'circleBtn',
		bottom: 20,
		right: 20,
	},

	mapListBtn: {
		extend: 'circleBtn',
		bottom: 20,
		left: 20,
	},

	progressBarWrapper: {
		height: '5px',
		width: '100%'
	}

}
