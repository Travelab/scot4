import { storiesOf, action } from '@kadira/storybook'
import { decorateAction } from '@kadira/storybook-addon-actions'
import l from '@libs/lang'

const firstArgAction = decorateAction([ args => args.slice(0,1) ])

import Slider from '../index.js'

storiesOf('Slider', module)
	.add('default', () => (
		<div style={{ width: '20%', padding: '20px' }}>
			<Slider
				start={0}
				end={100}
				from={0}
				to={90}
				onFromChange={action('from changed')}
				onToChange={action('to changed')}
			/>
		</div>
	))
	.add('with text values', () => (
		<div style={{ width: '20%', padding: '20px' }}>
			<Slider
				start={0}
				end={100}
				from={10}
				to={80}
				txtFromValue={l.currency(10)}
				txtToValue={l.currency(80)}
				onFromChange={action('from changed')}
				onToChange={action('to changed')}
			/>
		</div>
	))

