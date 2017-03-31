import theme from 'themes/default.js'


export default () => {
	const offers = {
		backgroundColor: theme.colors.backgroundGray,
	}

	return {
		container: {
			display: 'flex',
			width: '100%'
		},
		offers: {
			extend: offers,
			maxWidth: 740,
			padding: [ 10, 20, 10, 10 ],
			borderRight: {
				width: 5,
				color: '#AAA',
				style: 'solid'
			}
		},
		narrowOffers: {
			extend: offers,
		}
	}
}
