import theme from 'themes/default.js'


export default ({ fontSize = 12 } = {}) => {
	const ratingSize = fontSize * 2
	const squarePadding = 5

	return {
		ratingSize: {
			color: theme.colors.orange,
			fontSize: ratingSize
		},
		estimatedRatingSize: {
			extend: 'ratingSize',
			fontSize: fontSize * 1.5
		},
		description: {
			fontSize,
			color: theme.colors.gray
		},

		squareContainer: {
			color: 'white',
			fontSize: ratingSize,
			padding: squarePadding,
			width: ratingSize + squarePadding * 2,
			height: ratingSize + squarePadding,
			textAlign: 'center',
			borderRadius: theme.serpRadius,
			border: {
				width: 1,
				color: 'white',
				style: 'solid'
			}
		},
		darkSquareContainer: {
			extend: 'squareContainer',
			color: theme.colors.darkGray,
			border: {
				width: 1,
				color: theme.colors.gray,
				style: 'solid'
			}
		}
	}
}
