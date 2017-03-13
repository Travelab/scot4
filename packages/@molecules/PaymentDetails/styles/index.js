import theme from 'themes/clickavia.js'


export default () => {
	const flex = {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between'
	}
	const text = {
		color: theme.colors.darkGray,
		fontSize: 13
	}

	return {
		container: {
			extend: flex,
		},

		t414Container: {
			extend: flex,
			justifyContent: 'center',
			padding: 10,
			boxSizing: 'border-box'
		},

	orderNotReadyMsg: {
		extend: 'price',
		display: 'flex',
		flexFlow: 'column nowrap'
	},

	loaderWrapper: {
		alignSelf: 'center',
		width: 50,
		height: 50
	},

		fares: {
			width: 235,
			marginRight: 47,

			'& table': {
				width: '100%'
			}
		},

		fare: {
			extend: [ flex, text ],
		},
		fareTitle: {
			width: 165
		},
		fareSize: {
			marginLeft: 10,
			width: 65
		},

		total: {
			extend: flex,
			color: theme.colors.importantText,
			fontSize: 15,
			fontWeight: 'bold',
			marginTop: 5,
			paddingTop: 5,
			borderTop: {
				width: 1,
				style: 'solid',
				color: '#979797'
			}
		},
		currencyExchange: {
			fontSize: 11,
			color: theme.colors.darkGray,
			marginTop: 9
		},

		controls: {
			width: 271,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-end',
		},

		t414Controls: {
			extend: 'controls',
			width: '100%'
		},

		btn: {
			width: 239,
			marginRight: 10,
			marginTop: 32
		},

		t414Btn: {
			extend: 'btn',
			width: '100%',
			marginRight: 0,
			textTransform: 'uppercase'
		},

		agreements: {
			extend: flex,
		},
		agreementsList: {
			extend: text
		},

		checkbox: {
			marginRight: 8
		},

		t414CheckboxWrapper: {
			extend: 'checkbox',
			display: 'inline-flex',
			alignSelf: 'flex-start',
		},

		customCheckbox: {
			width: 0,
			height: 0,
			opacity: 0,

			'& + span': {
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: 30,
				height: 30,
				background: 'white',
				borderRadius: 5,
			},
			'&:not(checked) + span:after': {
				content: '""',
			},
			'&:checked + span:after': {
				content: '"\\2713"',
				fontSize: 30
			}
		}

	}
}
