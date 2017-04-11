import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import TravelabMainPage from '../index.js'
import duck from '../ducks/index'
import saga from '../sagas/index'

storiesOf('TravelabMainPage', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.add('default', () => (
		<TravelabMainPage/>
	))