import { getShared } from '../../utils'

export function component(options ={}) {
	let {
		test = /storybull\.js$/,
		exclude,
		include
	} = options

	if (exclude && !Array.isArray(exclude)) exclude = [ exclude ]
	if (include && !Array.isArray(include)) include = [ include ]

	const components = getShared('components')
	return {
		test, include, exclude,
		use: [{
			loader: require.resolve('./component-loader'),
			query: {
				components
			} 
		}]
	}
}