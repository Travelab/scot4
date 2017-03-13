import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'
import { createWrapperDecorator } from '@utils/taffy/storybull-decorators'

import CustomerForm from '../index.js'
import duck from '../ducks/index.js'

storiesOf('CustomerForm', module)
	.addDecorator(createReduxSagaDecorator(duck))
	.addDecorator(createWrapperDecorator('#d8e5e7', 1200))
	.add('default', () => (
		<CustomerForm/>
	))
