import { storiesOf, action } from '@kadira/storybook'
import l from '@libs/lang'

import ValuesRangeTxtLabel from '../index.js'

storiesOf('ValuesRangeTxtLabel', module)
	.add('default', () => (
		<ValuesRangeTxtLabel
			title={l('Цена за ночь')}
			values={[1,3]}
		/>
	))
	.add('with Infinity valueTo', () => (
		<ValuesRangeTxtLabel
			title={l('Цена за ночь')}
			values={[5, Infinity]}
		/>
	))
	.add('prices range', () => (
		<ValuesRangeTxtLabel
			values={[l.currency(3000, 'RUB'), l.currency(14394, 'RUB')]}
		/>
	))
	.add('distance rang', () => (
		<ValuesRangeTxtLabel
			values={[0.1 + l(' км'), 27 + l(' км')]}
		/>
	))

