import confy from '../index.js'
import { makeSwitcher } from '../utils.js'

const env = makeSwitcher({
	options: [
		{
			label: () => {
				const ENV = confy ? confy.get('ENV') : 'unset'
				return `ENV: ${ENV}`
			},
			pointer: () => (confy ? confy.get('ENV') : 'default')
		},
		{
			label: 'Production',
			pointer: 'prod'
		},
		{
			label: 'Development',
			pointer: 'dev'
		},
		{
			label: 'Staging',
			pointer: 'stage'
		},
		{
			label: 'QA',
			pointer: 'mock'
		},
	]
})

export default env