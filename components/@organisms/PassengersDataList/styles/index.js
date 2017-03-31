export default {

	container: {
		width: '100%',
	},

	formsList: {
		width: '100%',
		paddingBottom: 30
	},

	formListItem: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		borderBottom: {
			width: 1,
			style: 'dashed',
			color: '#969696'
		}
	},
	t414FormListItem: {
		extend: 'formListItem',
		flexFlow: 'column nowrap'
	},

	formWrapper: {
		width: 700,
		paddingBottom: 30
	},
	t414FormWrapper: {
		extend: 'formWrapper',
		width: '100%',
		paddingBottom: 10
	},

	addingControls: {
		display: 'flex',
		alignItems: 'center',
		padding: [ 0, 10 ]
	},

	addBtn: {
		width: '100%',
		textTransform: 'uppercase'
	}

}
