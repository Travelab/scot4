export default {

	searchBarContainer: {
		display: 'flex',
		flexFlow: 'row wrap',
		width: '100%',
		padding: 20,
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
		marginBottom: '100px',
		left: 0,
		right: 0
	}
}

