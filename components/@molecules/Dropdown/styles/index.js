export default {

	container: {
		display: 'flex',
		flexFlow: 'column nowrap',
		width: '100%',
		position: 'relative'
	},

	fieldsWrapper: {
		display: 'flex',
		flexFlow: 'row wrap',
		width: '100%',
		flexWrap: 'nowrap',
	},

	borderBottomField: {
		borderBottom: {
			width: 1,
			style: 'solid',
			color: '#b5b5b5'
		}
	},

	wrappedField: {
		flexGrow: 1,
		flexBasis: '100%'
	},

	dropdownBlockWrapper: {
		position: 'absolute',
		top: 'calc(100% + 5px)',
		left: 0,
		width: '100%',
		boxShadow: '3px 3px 10px 3px rgba(0,0,0,0.75)',
		zIndex: 10,
	},

	dropdownBlockBackground: {
		background: '#fff'
	},

	dropdownBlockWidthByChild: {
		width: 'initial'
	},

	dropdownBlockInlay: {
		position: 'static',
		boxShadow: 'none',
	},

	dropdownBlockBorderBottom: {
		borderBottom: {
			width: 1,
			style: 'solid',
			color: '#b5b5b5'
		}
	}

}
