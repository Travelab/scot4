const outerPaddings = {
	padding: [ 16, 24 ],
	paddingBottom: 0,
	boxSizing: 'border-box'
}

export default {

	t414Container: {
		width: '100%',
		background: 'radial-gradient(circle at 50% 50%, #fff, #a2adaf)',
	},

	title: {
		...outerPaddings,
		paddingBottom: 13,
		fontSize: 20,
		lineHeight: 1.1,
		color: '#333',
		letterSpacing: '0.5px',
		textAlign: 'left'
	},

	selectorWrapper: {
		...outerPaddings,
		width: '100%',
	},

	selector: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between'
	},
	selectorTitle: {
		display: 'flex',
		flexFlow: 'column nowrap',
		fontSize: 14,
		color: '#333',
		flex: '1 0 0'
	},
	selectorTitleAge: {
		fontSize: 12,
		color: '#777'
	},
	counterWrapper: {
		maxWidth: 104,
		flex: '1 0 0'
	},

	confirmBtn: {
		width: '100%',
		paddingTop: 24,
		textTransform: 'uppercase',
		borderBottom: {
			width: 4,
			style: 'solid',
			color: '#347410'
		}
	}

}
