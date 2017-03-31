import theme from 'themes/default.js'


export default function({ height = 20 } = {}) {
	const backgroundSize = 28

	return {
		'@keyframes barLoaderMove': {
			from: {
				backgroundPosition: [0, 0]
			},
			to: {
				backgroundPosition: [backgroundSize, 0]
			}
		},
		bar: {
			width: '100%',
			height: height,
			border: {
				width: 1,
				style: 'solid',
				color: '#2980b9',
			},
			borderRadius: theme.serpRadius,
			backgroundImage: `repeating-linear-gradient(-45deg, #2980b9, #2980b9 11px, #eee 10px, #eee 20px)`,
			backgroundSize: [backgroundSize, backgroundSize],
			animation: {
				name: 'barLoaderMove',
				duration: '.5s',
				timingFunction: 'linear',
				iterationCount: 'infinite'
			},
		},
	}
}
