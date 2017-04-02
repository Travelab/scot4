import { makeSwitcher } from '../utils.js'
import l from '@libs/lang'

const protocol = makeSwitcher({
	options: [
		{
			label: () => (`Current language: ${l.lang}`),
			pointer: () => (l.lang)
		},
		{
			label: 'Russian',
			pointer: 'ru-RU'
		},
		{
			label: 'English',
			pointer: 'en-US'
		},
	],
})

export default protocol
