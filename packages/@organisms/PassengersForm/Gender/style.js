export default {
	container: {
		width: '100%',
		outline: 'none',
		position: 'relative'
	},

	labelGender: {
		textTransform: 'uppercase'
	},

	genderRadioLabel: {
		display: 'inline-block',
		fontSize: 18,
		fontWeight: 600,
		padding: 10
	},

	t414RadioWrapper: {
		extend: 'radioWrapper',
		height: 35,
		fontSize: 13
	},

	radioWrapper: {
		height: 37,
		display: 'flex',
		flexFlow: 'row nowrap',
		border: {
			width: 1,
			style: 'solid',
			color: '#a5a5a5',
		},
		borderRadius: 5,
		overflow: 'hidden'
	},

	label: {
		display: 'flex',
		flexFlow: 'row nowrap',
		alignItems: 'stretch',
		flexGrow: 1
	},

	male: {
		extend: 'label',
		color: '#486390',
		borderRight: {
			width: 1,
			style: 'solid',
			color: '#afafaf'
		}
	},

	female: {
		extend: 'label',
		color: '#dc4c8e',
		borderLeft: {
			width: 1,
			style: 'solid',
			color: '#f9f9f9'
		}
	},

	radio: {
		opacity: 0,
		margin: 0,
		width: 0,
		display: 'none',

		'& + span': {
			flexGrow: 1,
			display: 'flex',
			flexFlow: 'row nowrap',
			justifyContent: 'center',
			alignItems: 'center',
			cursor: 'pointer',
			fontWeight: 600
		},
		'&:not(checked) + span': {
			background: 'linear-gradient(to bottom, #eceded, #c2c2c2)'
		},
		'&:checked + span': {
			background: 'linear-gradient(to top, #eceded, #c2c2c2)',
			boxShadow: 'inset 0 0 5px 0 #8a8a8a'
		},
	}
}
