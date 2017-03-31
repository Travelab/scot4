export default {

	container: {
		width: '100%',
		display: 'flex',
		flexFlow: 'row nowrap'
	},

	wrapper: {
		color: '#444',
		fontSize: 18
	},

	emailWrapper: {
		extend: 'wrapper',
		paddingLeft: 0,
		width: '100%',
		padding: 10,
		flexGrow: 1
	},
	t414EmailWrapper: {
		extend: 'emailWrapper',
		fontSize: 16,
		padding: 0,
		paddingRight: 10
	},

	phoneWrapper: {
		extend: 'wrapper',
		width: '100%',
		padding: 10,
		flexGrow: 1
	},
	t414PhoneWrapper: {
		extend: 'phoneWrapper',
		fontSize: 16,
		padding: 0,
	},

}
