import { sg } from '@utils/taffy'

export default {

	container: {
		padding: [ sg(2), sg(3.5) ],
	},

	t414Container: {
		padding: [ sg(2), 10 ],
		paddingBottom: sg(1)
	},

	label: {
		marginLeft: sg(1),
		fontSize: 14,
		color: '#777',
		textTransform: 'uppercase',
	},

	info: {
		display: 'flex',
		alignItems: 'center',
		marginTop: sg(1),
	},

	direction: {
		width: '100%',
		paddingRight: sg(0.8),

		'& h2': {
			margin: 0,
			fontSize: 22,
			fontWeight: 500,
			color: '#333',
		}
	},

	time: {
		width: '100%',
		paddingLeft: sg(0.8),
		fontSize: 16,
		fontWeight: 500,
		color: '#333',
	},

}
