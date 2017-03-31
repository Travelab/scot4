import theme from 'themes/default.js'


export default ({ fontSize = 12} = {}) => (

	{
		content: {
			color: theme.colors.orange,
			fontSize: fontSize
		},
		description: {
			fontSize,
			color: theme.colors.gray
		}
	}
)
