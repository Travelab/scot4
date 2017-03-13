import { storiesOf, action } from '@kadira/storybook'
import { decorateAction } from '@kadira/storybook-addon-actions'
import { DateUtils } from 'react-day-picker'

import Component from '../index.js'

const firstArgAction = decorateAction([
  args => args.slice(0, 1)
])

const from = new Date(2017, 0, 15)
const to = new Date(2017, 1, 5)

storiesOf('DayPicker', module)
	.add('default', () => (
		<div style={{background: 'lightblue', height: '500px', padding: '50px'}}>
			<Component
				onDayClick={action('on day clicked')}
				selectedDays={day => DateUtils.isDayInRange(day, {from, to}) }
				modifiers={{
					from: day => DateUtils.isSameDay(day, from),
					to: day => DateUtils.isSameDay(day, to)
				}}
			/>
		</div>
	))

