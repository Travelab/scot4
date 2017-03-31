const COMPONENT_PADDING = 10

export default {

	container: {
		display: 'flex',
		flexFlow: 'row wrap',
		with: '100%',
		boxSizing: 'border-box',
		padding: COMPONENT_PADDING / 2
	},

	checkboxItem: {
		display: 'flex',
		flexFlow: 'row wrap',
		width: '50%',
		boxSizing: 'border-box',
		padding: COMPONENT_PADDING / 2,
		justifyContent: 'space-between',

		'& [type="checkbox"]': {
			position: 'absolute',
			left: -9999999
		},

		'& [type="checkbox"] + label': {
			position: 'relative',
			paddingLeft: 25,
			cursor: 'pointer'
		},

		'& [type="checkbox"] + label:before': {
			content: 'close-quote',
			position: 'absolute',
			left: 0,
			top: 0,
			width: 17,
			height: 17,
			border: {
				width: 1,
				style: 'solid',
				color: '#979797'
			},
			background: 'white'
		},

		'& [type="checkbox"] + label:hover:before': {
			borderColor: '#4778d9'
		},

		'& [type="checkbox"] + label:after': {
			content: '"✔"',
			position: 'absolute',
			top: 1,
			left: 4,
			fontSize: 18,
			lineHeight: 0.8,
			color: '#fd9626',
			transition: 'all .2s'
		},

		'& [type="checkbox"]:not(:checked) + label:after': {
			opacity: 0,
			transform: 'scale(0)'
		},

		'& [type="checkbox"]:checked + label:after': {
			opactity: 1,
			transform: 'scale(1)'
		},

 /*    '& [type="checkbox"]:disabled + label:before': { */
			// borderColor: '#bbb',
			// background: '#ddd'
		// },

		// '& [type="checkbox"]:disabled + label': {
			// color: '#aaa'
		/* } */

	}

}
