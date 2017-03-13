import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import SerpPage from '../index.js'
import duck from '../ducks/index.js'
import saga from '../sagas/index.js'

storiesOf('SerpPage', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.add('default', () => (
		<SerpPage/>
	))