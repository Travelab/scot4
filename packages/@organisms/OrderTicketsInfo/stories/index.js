import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'
import { createWrapperDecorator } from '@utils/taffy/storybull-decorators'
import mock from '@libs/offer-mock'

import OrderTicketsInfo from '../index.js'
import duck from '../ducks/index.js'
import saga from '../sagas/index.js'

const offer = mock({ shaped: false })

storiesOf('OrderTicketsInfo', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.addDecorator(createWrapperDecorator('#00a6cf', 960))
	.add('default', () => (
		<OrderTicketsInfo offer={offer}/>
	))
