import theme from 'themes/default.js'


export default ({ fontSize = 12 } = {}) => {
	const mealType = {
			fontSize,
			textTransform: 'uppercase'
	}

	return {
		mealType: {
			extend: mealType,
			color: theme.colors.darkGray,
		},
		lightMealType: {
			extend: mealType,
			color: 'white',
		},
	}
}
