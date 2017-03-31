import theme from 'themes/default.js'


export default ({ fontSize = 16 } = {}) => (
	{
		option: {
			fontSize,
			cursor: 'pointer',
			textAlign: 'center',
			textTransform: 'lowercase'
		},
		activeOption: {
			extend: 'option',
			
			'& span': {
				borderBottom: {
					width: 2,
					style: 'solid',
					color: theme.colors.orange
				}
			}
		}
	}
)
