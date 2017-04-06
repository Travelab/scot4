import theme from 'themes/default.js'
export default (height = 20, backgroundSize = 28) => prejss`
	@keyframes barLoaderMove 
		from
			background-position: 0 0
		to 
			background-position: ${backgroundSize}px 0

	.bar 
		width: 100%
		height: ${height}px
		border: 1px solid #2980b9
		border-radius: ${theme.serpRadius}px
		background-image: repeating-linear-gradient(-45deg, #2980b9, #2980b9 11px, #eee 10px, #eee 20px)
		background-size: ${backgroundSize}px ${backgroundSize}px
		animation: barLoaderMove .5s linear infinite
`