export default {
	flightType: {
		textTransform: 'none',
		fontSize: 12,
		fontWeight: 500,
		borderRadius: 5,
		color: 'white',
		padding: 5,
	},

	flightCharter: {
		extend: 'flightType',
		background: '#00ccff'
	},
	flightRegular: {
		extend: 'flightType',
		background: '#00cc33'
	},
	flightLowcoster: {
		extend: 'flightType',
		background: '#ff9933'
	},

	showRulesBtn: {
		fontSize: 12,
		textTransform: 'uppercase'
	},
}
