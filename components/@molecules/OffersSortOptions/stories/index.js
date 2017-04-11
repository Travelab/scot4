import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import OffersSortOptions from '../index.js'
import duck from '../ducks/index'
import saga from '../sagas/index'

storiesOf('OffersSortOptions', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.add('default', () => (
		<OffersSortOptions/>
	))

