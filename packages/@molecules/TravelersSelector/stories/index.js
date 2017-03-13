import { storiesOf, action } from '@kadira/storybook'
import { decorateAction } from '@kadira/storybook-addon-actions'

import Component from '../index.js'

const firstArgAction = decorateAction([
  args => args.slice(0, 1)
]);

storiesOf('TravelersSelector', module)
	.add('default', () => (
		<div style={{background: 'lightblue', height: '500px', padding: '50px'}}>
			<Component
				adultsValue={1}
				childrenValue={0}
				babiesValue={0}
				onFieldClick={action('on field clicked')}
			/>
		</div>
	))
	.add('activated', () => (
		<div style={{background: 'lightblue', height: '500px', padding: '50px'}}>
			<Component
				adultsValue={1}
				childrenValue={4}
				babiesValue={0}
				isActivated={true}
				onFieldClick={action('on field clicked')}
				onAdultsValueClick={firstArgAction('adtuls changed')}
				onChildrenValueClick={firstArgAction('children changed')}
				onBabiesValueClick={firstArgAction('babies changed')}
			/>
		</div>
	))

