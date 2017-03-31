import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator  } from '@libs/lash/create-redux-saga-decorator'
import { createWrapperDecorator } from '@utils/taffy/storybull-decorators'

import OrderForm from '../index.js'
import duck from '../ducks/index.js'
import saga from '../sagas/index.js'

storiesOf('OrderForm', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.addDecorator(createWrapperDecorator('#00a6cf', 960))
	.add('default', () => (
		<OrderForm/>
	))
