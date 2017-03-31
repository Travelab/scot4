import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import Component from '../index.js'
import duck from '../ducks'
import saga from '../sagas'

storiesOf('SearchBar', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.add('default', () => (
		<Component/>
	))

