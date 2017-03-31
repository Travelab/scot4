import { sg } from '@utils/taffy'

const list = {
	width: 0,
	flex: '1 0 auto',
	padding: sg(0.8),

	// Если надо будет привязать секции к низу:
	/*display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-end',*/
}

const item = {
	padding: sg(0.2),
}

export default {

	container: {
		padding: [ sg(1), sg(2.5) ],
		display: 'flex',
	},

	half: {
		width: 0,
		flex: '1 0 auto',
		display: 'flex',
	},

	straight: {
		extend: item,
	},

	divided: {
		extend: item,
		display: 'flex',
		alignItems: 'center',
		position: 'relative',

		'& > div + div': {
			marginLeft: sg(1),
		}
	},

	dividedPlace: {
		extend: 'divided',
		alignItems: 'baseline'
	},

	depart: {
		extend: list,
		marginTop: sg(2),
	},

	arrive: {
		extend: list,
		marginTop: sg(2),
	},

	flight: {
		extend: list,
		width: '35%',
	},

	service: {
		extend: list,
		width: '65%',
		marginTop: sg(2),
	},

	label: {
		fontSize: 12,
		letterSpacing: 1,
		color: '#777',
		textTransform: 'uppercase',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis'
	},

	time: {
		fontSize: 24,
		color: '#333',
	},

	caption: {
		fontSize: 16,
		color: '#333',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
	},

	t414Container: {
		padding: [ 8, 10 ],
		paddingBottom: 0
	},

	row: {
		display: 'flex',
		paddingBottom: 10,
		alignItems: 'center'
	},

	t414Depart: {
		extend: 'depart',
		flexBasis: '10%',
		padding: 0,
		marginTop: 0
	},

	t414Arrive: {
		extend: 'arrive',
		padding: 0,
		marginTop: 0
	},

	t414AirlineLogo: {
		extend: list,
		flexBasis: '10%',
		padding: 0,
	},

	t414FlightDuration: {
		extend: list,
		padding: 0
	},

	t414BaggageInfo: {
		extend: list,
		flexBasis: '10%',
		padding: 0
	},

	t414FlightNumber: {
		extend: list,
		padding: 0
	},

}
