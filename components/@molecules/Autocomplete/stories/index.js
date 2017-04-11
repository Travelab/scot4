import { storiesOf, action } from '@kadira/storybook'
import { decorateAction } from '@kadira/storybook-addon-actions'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import Component from '../index.js'
import duck from '../ducks/index'
import saga from '../sagas/index'

const firstArgAction = decorateAction([
  args => args.slice(0, 1)
]);

storiesOf('Autocomplete', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.add('default', () => (
		// <div style={{background: 'lightblue', height: '500px', padding: '50px'}}>
			<Component
				placeholder='Откуда'
				onFieldClick={action('field clicked')}
			/>
		// </div>
	))
	.add('activated', () => (
		// <div style={{background: 'lightblue', height: '500px', padding: '50px'}}>
			<Component
				isActivated
			/>
		// </div>
	))

