import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'
import { createWrapperDecorator } from '@utils/taffy/storybull-decorators'

import PassengersForm from '../index.js'
import duck from '../ducks/index.js'
import saga from '../sagas/index.js'

storiesOf('PassengersForm', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.addDecorator(createWrapperDecorator('#d8e5e7', 1200))
	.add('default', () => (
		<PassengersForm/>
	))
