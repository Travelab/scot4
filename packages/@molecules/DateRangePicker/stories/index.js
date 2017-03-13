import { storiesOf, action } from '@kadira/storybook'
import { decorateAction } from '@kadira/storybook-addon-actions'

import Component from '../index.js'

const firstArgAction = decorateAction([
  args => args.slice(0, 1)
]);

storiesOf('DateRangePicker', module)
	.add('default', () => (
		<div style={{background: 'lightblue', height: '500px', padding: '50px'}}>
			<Component
				onFromFieldClick={action('from field clicked')}
				onToFieldClick={action('to field clicked')}
			/>
		</div>
	))
	.add('fromFieldActivated', () => (
		<div style={{background: 'lightblue', height: '500px', padding: '50px'}}>
			<Component
				isFromFieldActivated
				onFromFieldClick={action('from field clicked')}
				onToFieldClick={action('to field clicked')}
				onFromDayClick={action('from day clicked')}
				onToDayClick={action('to day clicked')}
			/>
		</div>
	))
	.add('toFieldActivatedWithFromDate', () => (
		<div style={{background: 'lightblue', height: '500px', padding: '50px'}}>
			<Component
				fromDate={new Date(2017, 0, 10)}
				isToFieldActivated
				onFromFieldClick={action('from field clicked')}
				onToFieldClick={action('to field clicked')}
				onFromDayClick={action('from day clicked')}
				onToDayClick={action('to day clicked')}
			/>
		</div>
	))
	.add('fromFieldActivatedWithFromDateAndToDate', () => (
		<div style={{background: 'lightblue', height: '500px', padding: '50px'}}>
			<Component
				fromDate={new Date(2017, 0, 12)}
				toDate={new Date(2017, 0, 17)}
				isFromFieldActivated
				onFromFieldClick={action('from field clicked')}
				onToFieldClick={action('to field clicked')}
				onFromDayClick={action('from day clicked')}
				onToDayClick={action('to day clicked')}
			/>
		</div>
	))

