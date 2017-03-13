import { makeSwitcher } from '../utils.js'

const defaultProtocol = document.location.protocol

const protocol = makeSwitcher({
	options: [
		{
			label: `Site protocol = ${defaultProtocol}`,
			pointer: 'default'
		},
		{
			label: 'HTTP',
			pointer: 'http'
		},
		{
			label: 'HTTPS',
			pointer: 'https'
		},
	],
	values: {
		default: defaultProtocol,
		http: 'http:',
		https: 'https:',
	}
})

export default protocol