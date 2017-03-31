import { sg } from '@utils/taffy'

export default {

	container: {
		padding: [ sg(4), sg(2.5) ],
	},

	t414Container: {
		padding: [ sg(4), 0 ]
	},

	content: {
		marginTop: sg(2),
	},

	header: {
		margin: 0,
		fontSize: 26,
		fontWeight: 500,
		color: '#424848',
		letterSpacing: 0.3,
	},

	caption: {
		fontSize: 14,
		fontWeight: 500,
		lineHeight: 1.29,
		letterSpacing: 0.2,
		color: '#777',
	},

	title: {
		display: 'flex',
		flexFlow: 'column nowrap'
	},

	centeredTitle: {
		extend: 'title',
		boxSizing: 'border-box',
		alignItems: 'center',
		textAlign: 'center',
		padding: [0, 10]
	},

}
