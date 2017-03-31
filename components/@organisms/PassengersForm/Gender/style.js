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
		height: 38,
		fontSize: 13
	},

	radioWrapper: {
		height: 44,
		display: 'flex',
		flexFlow: 'row nowrap',
		overflow: 'hidden',
		justifyContent: 'space-between',
	},

	label: {
		display: 'flex',
		width: 24,
		flexFlow: 'row nowrap',
		alignItems: 'stretch',
		justifyContent: 'space-around',
		position: 'relative',
		color: 'rgba(107, 107, 107, 0.87)',
		lineHeight: '1',
	},

	male: {
		extend: 'label',
		'& input:checked + span': {
			backgroundColor: '#1e88e5',
			opacity: 1,
		},
	},

	female: {
		extend: 'label',
		color: 'rgba(107, 107, 107, 0.87)',
		'& input:checked + span': {
			background: '#d81b60',
			opacity: 1,
		},
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
			fontWeight: 600,
			content: '""',
		},
		'&:not(checked) + span': {
			background: '#c7c7c7',
			opacity: '0.5'
		},
		'&:checked + span::before': {
			background: '#fff',
		},
	},
	check: {
		display: 'block',
		position: 'absolute',
		borderRadius: '100%',
		backgroundColor: '#c7c7c7',
		opacity: '0.5',
		height: 24,
		width: 24,
		bottom: 0,
		left: 0,
		zIndex: 5,
		transition: {
			property: 'all',
			duration: '0.25s',
			timingFunction: 'linear',
		},
		'&:hover': {
			opacity: 1,
		},
		'&::before': {
			display: 'block',
			position: 'absolute',
			content: '""',
			borderRadius: '100%',
			height: 8,
			width: 8,
			top: 8,
			left: 8,
			margin: 'auto',
			transition: {
				property: 'background',
				duration: '0.25s',
				timingFunction: 'linear',
			},
		}
	}
}
