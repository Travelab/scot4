import { storiesOf, action } from '@kadira/storybook'

import CounterBtn from '../index.js'

storiesOf('CounterBtn', module)
	.add('normal plus', () => (
		<div style={{width: 80, height: 80, padding: 20}}>
			<CounterBtn plus />
		</div>
	))
	.add('disabled minus', () => (
		<div style={{width: 80, height: 80, padding: 20}}>
			<CounterBtn minus isDisabled />
		</div>
	))
