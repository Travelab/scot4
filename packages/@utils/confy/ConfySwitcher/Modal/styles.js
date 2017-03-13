const baseZ = 999999

export default {

	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		padding: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255,255,255,.8)',
		zIndex: baseZ,
	},

	close: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},

	popup: {
		padding: 20,
		width: '100%',
		maxWidth: 400,
		backgroundColor: '#fff',
		border: {
			width: 1,
			style: 'solid',
			color: '#aaa',
		},
		boxShadow: {
			x: 0,
			y: 2,
			blur: 10,
			spread: null,
			color: 'rgba(0,0,0,.25)',
			inset: null,
		},
		position: 'relative',
	},

	header: {
		marginTop: 0,
		marginBottom: 20,
		color: '#666',
		fontFamily: '"Trebuchet MS", Tahoma, Arial, sans-serif',
	},

	content: {
		maxHeight: '80vh',
		overflow: 'auto',

		'& > p': {
			margin: [ 0, 0, '1em' ],

			'&:last-child': {
				margin: 0
			}
		}
	},

	item: {
		margin: [ 8, 0 ],
		display: 'flex',
		flexDirection: 'column',
	},

	options: {
		display: 'flex',
		flexWrap: 'wrap',
	},

	label: {
		flexGrow: '1',
		color: '#808080',
		fontSize: '14px',
		breakWord: 'break-word',
	},

	chooser: {
		//
	},

	value: {
		fontSize: '12px',
		breakWord: 'break-word',
	},

	footer: {
		marginTop: 30,
		textAlign: 'center',
	},

}