import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import Filters from '../index.js'
import duck from '../ducks/index.js'
import saga from '../sagas/index.js'

storiesOf('Filters', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.add('default', () => (
		<Filters/>
	))
