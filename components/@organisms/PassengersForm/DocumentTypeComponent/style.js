export default {
	container: {
		width: '100%',
		outline: 'none'
	},

	label: {
		textTransform: 'uppercase'
	},

	inputWrapper: {
		padding: 11,
		boxSizing: 'border-box',
		background: 'white'
	},

	fieldWithDownArrow: {
		extend: 'inputWrapper',
		width: '100%',
		position: 'relative',
		'&:after': {
			content: '""',
			cursor: 'pointer',
			position: 'absolute',
			top: '25%',
			right: '3%',
			width: 10,
			height: 10,
			border: {
				width: 3,
				style: 'solid',
				color: '#969696'
			},
			borderTop: 'none',
			borderRight: 'none',
			transform: 'rotate(-45deg)'
		}
	}
}
