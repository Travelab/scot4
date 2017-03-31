export default {
	container: {
		display: 'flex',
		flexFlow: 'column nowrap',
		alignItems: 'stretch',
		padding: [ 24, 82, 40, 82 ]
	},
	t959Container: {
		extend: 'container',
		paddingLeft: 10,
		paddingRight: 10,
	},

	title: {
		display: 'flex',
		justifyContent: 'center',
		fontSize: 32,
		lineHeight: 1.38,
		fontWeight: 500,
	},
	t959Title: {
		extend: 'title',
		textAlign: 'center'
	},

	content: {
		display: 'flex',
		justifyContent: 'center',
		padding: [ 16, 0, 39, 0 ]
	},

	footer: {
		display: 'flex',
		justifyContent: 'center'
	}
}
