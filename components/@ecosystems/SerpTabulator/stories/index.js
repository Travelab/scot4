import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'
import SerpTabulator from '../index'

import SerpTabulator from '../index.js'
import duck from '../ducks/index.js'

storiesOf('SerpTabulator', module)
	.addDecorator(createReduxSagaDecorator(duck))
	.add('default', () => (
		<SerpTabulator>
			<div label="Tickets">Tickets</div>
			<div label="Hotels">Hotels</div>
			<div label="Transfer">Transfer</div>
		</SerpTabulator>
	))