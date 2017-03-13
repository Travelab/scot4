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

	removeBtn: {
		alignSelf: 'flex-end',
		fontSize: 13,
		marginBottom: 17,
		cursor: 'pointer',
		textDecoration: 'underline',
		color: '#767676'
	},
	t414RemoveBtn: {
		extend: 'removeBtn',
		alignSelf: 'center'
	},

	addingControls: {
		display: 'flex',
		alignItems: 'center'
	},
	t414AddingControls: {
		extend: 'addingControls',
		padding: [0, 10]
	},

	addingText: {
		width: 92,
		paddingRight: 10,
		fontSize: 13,
		lineHeight: 1.2
	},

	addAdultBtn: {
		width: 100,
		paddingRight: 10
	},
	addChildBtn: {
		width: 200,
		paddingRight: 10,
	},
	addInfantBtn: {
		width: 235
	},

	t414AddBtn: {
		width: '100%',
		textTransform: 'uppercase'
	}

}
