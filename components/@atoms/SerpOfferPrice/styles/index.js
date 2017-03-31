import theme from 'themes/default.js'


export default ({ fontSize = 11, width = 149 } = {}) => (

	{
		container: {
			width,

			'& .consist': {
				color: theme.colors.gray
			}
		},
		conciseContainer: {
			paddingLeft: 5
		},
		activeContainer: {
			color: 'white',

			'& .consist': {
				color: 'white'
			}
		},
		price: {
			fontSize: fontSize * 2,
		},
		rightAlignedPrice: {
			extend: 'price',
			textAlign: 'right'
		},
		consist: {
			fontSize
		},
	}
)
