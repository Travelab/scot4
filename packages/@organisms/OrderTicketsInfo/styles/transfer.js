import { sg } from '@utils/taffy'

import imgCoffee from '../images/coffee.svg'

export default {

	container: {
		padding: [ sg(1), sg(2.5) ],
		display: 'flex',
		alignItems: 'center',
		backgroundColor: '#eaecd9',
	},

	half: {
		width: 0,
		padding: sg(0.8),
		flex: '1 0 auto',
	},

	caption: {
		fontSize: 16,
		color: '#333',

		'& + $caption': {
			marginTop: sg(0.5)
		}
	},

	delay: {
		extend: 'half',
		display: 'flex',
		alignItems: 'center',
	},

	icon: {
		flexShrink: 0,
		backgroundImage: `url(${imgCoffee})`,
		width: sg(2),
		height: sg(2),
		marginRight: sg(1),
		marginLeft: sg(-3),
	},

	t414Container: {
		display: 'flex',
		padding: 10,
		margin: [ 10, 0 ],
		flexFlow: 'column nowrap',
		backgroundColor: '#eaecd9',
	},

	row: {
		display: 'flex',
		justifyContent: 'center'
	},

	t414DelayIcon: {
		extend: 'icon',
		marginLeft: 0
	},

	changeCity: {
		extend: 'caption',
		fontSize: 14,
		fontWeight: 'bold'
	},

	changeAirport: {
		extend: 'caption',
		fontSize: 14,
		textTransform: 'lowercase'
	},

}
