export default {

	searchBarContainer: {
		display: 'flex',
		flexFlow: 'row wrap',
		width: '100%',
		boxSizing: 'border-box',
		flexWrap: 'nowrap',
	},

	fieldWrapper: {
		minWidth: 175,
	},

	dateRangePickerWrapper: {
		extend: 'fieldWrapper',
		minWidth: 320
	},

	searchBtnWrapper: {
		flexGrow: 1,
		minWidth: 100
	},

	mobileSearchBarContainer: {
		display: 'flex',
		flexFlow: 'column nowrap',
		position: 'absolute',
		background: '#f0f0f0',
		marginBottom: 100,
		left: 0,
		right: 0
	},
	inlayMobileSearchBarContainer: {
		extend: 'mobileSearchBarContainer',
		position: 'relative'
	}
}

