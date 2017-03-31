import { sg } from '@utils/taffy'

export default {

	inputsWrapper: {
		width: '100%',
		outline: 'none',
		display: 'flex',
		flexWrap: 'nowrap',
		background: 'white',
	},

	inputWrapper: {
		padding: 11,
		boxSizing: 'border-box',
		flex: '1 0 0'
	},

	dayInput: {
		extend: 'inputWrapper',
		borderRight: {
			width: 1,
			style: 'solid',
			color: '#ccc'
		},
	},

	monthInput: {
		extend: 'inputWrapper',
		borderRight: {
			width: 1,
			style: 'solid',
			color: '#ccc'
		},
	},

	yearInput: {
		extend: 'inputWrapper',
	}

}
