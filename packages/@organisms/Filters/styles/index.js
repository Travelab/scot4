const FILTERS_BTN_HEIGHT = 50
const FILTERS_BTN_WIDTH = FILTERS_BTN_HEIGHT

export default {

	filtersHeader: {
		display: 'flex',
		flexFlow: 'row wrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10,
		paddingBottom: 0
	},

	container: {
		width: '100%',
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'center',
		background: 'white'
	},

	mobileContainer: {
		display: 'flex',
		flexFlow: 'column nowrap',
		width: '100%',
		alignItems: 'stretch',
		background: '#f0f0f0'
	},

	filtersLabel: {
		fontSize: 16
	},

	filter: {
		cursor: 'pointer',
		outline: 'none'
	},

	rightBorder: {
		borderRight: {
			width: 1,
			style: 'solid',
			color: '#b5b5b5'
		},
	},

	mobileFilter: {
		fontSize: 15
	},

	priceFilter: {
		minWidth: 240
	},

	ratingFilter: {
		minWidth: 200
	},

	distanceFilter: {
		minWidth: 200
	},

	starsFilter: {
		minWidth: 240,
		borderRight: 'none'
	}

}
