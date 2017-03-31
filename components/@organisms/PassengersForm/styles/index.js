export default {

	container: {
		width: '100%',
		display: 'flex',
		flexFlow: 'column nowrap'
	},

	row: {
		width: '100%',
		display: 'flex',
		flexFlow: 'row nowrap',
		'& > div:first-child': {
			paddingLeft: 0
		},
		'& > div:last-child': {
			paddingRight: 0
		}
	},

	wrapper: {
		padding: 10,
		flexGrow: 1,
		width: '100%',
		boxSizing: 'border-box',
		color: '#444',
		fontSize: 16
	},

	firstNameWrapper: {
		extend: 'wrapper',
	},

	t414FirstNameWrapper: {
		extend: 'firstNameWrapper',
		fontSize: 13
	},

	lastNameWrapper: {
		extend: 'wrapper',
	},

	t414LastNameWrapper: {
		extend: 'lastNameWrapper',
		fontSize: 13,
	},

	birthDateWrapper: {
		color: '#444',
		fontSize: 16,
		padding: 10,
		boxSizing: 'border-box'
	},

	t414BirthDateWrapper : {
		extend: 'birthDateWrapper',
		fontSize: 13,
		width: 170,
		flexGrow: 1,
		flexShrink: 0,
	},

	citizenshipWrapper: {
		extend: 'wrapper',
		flex: '1 0 50%'
	},

	t414CitizenshipWrapper: {
		extend: 'wrapper',
		fontSize: 13,
	},

	genderRadioWrapper: {
		padding: 10,
		width: 100,
		flexShrink: 0,
	},

	t414GenderRadioWrapper: {
		extend: 'genderRadioWrapper',
		paddingLeft: 10,
		width: 70
	},

	documentDataWrapper: {
		margin: 10,
		display: 'flex',
		flexGrow: 1,
		width: '100%',
		border: {
			width: 1,
			style: 'solid',
			color: '#a2acad'
		},
		borderRadius: 5
	},

	docNumWrapper: {
		minWidth: 210,
		extend: 'wrapper',
	},

	t414DocNumWrapper: {
		extend: 'docNumWrapper',
		fontSize: 13,
		flexGrow: 1,
		minWidth: 150,
	},

	documentTypeWrapper: {
		extend: 'wrapper',
	},

	t414DocumentTypeWrapper: {
		extend: 'documentTypeWrapper',
		fontSize: 13,
	},

	docValidityWrapper: {
		width: 250,
		flexShrink: 0,
		extend: 'wrapper'
	},

	t414DocValidityWrapper: {
		extend: 'docValidityWrapper',
		fontSize: 13,
		width: 170,
		paddingLeft: 20,
	}

}
