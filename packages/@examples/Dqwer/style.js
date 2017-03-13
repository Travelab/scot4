import SVGsb from './ic_subscriptions_24px.svg'

const nay = {
	extend: {
		display: 'flex',
		flexFlow: 'row wrap',
		justifyContent: 'center',
		maxWidth: 160
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	height: 100
}

const t = {
	textDecoration: 'underline'
}

export default function (fontSize = 50, margin = 5) {

	return {
		er: {
			extend: [t, nay],
			margin
		},
		heee: {
			extend: 'er',
			backgroundColor: 'yellow',
			backgroundImage: `url("${SVGsb}")`,
			fontSize
		},

		'not-good': {
			'font-size': 20
		},
		'practice': {
			fontSize: 30
		}
	}
}