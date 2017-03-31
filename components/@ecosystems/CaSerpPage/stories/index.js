import { storiesOf } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import CaSerpPage from '../index'
import duck from '../ducks'
import saga from '../sagas'

storiesOf('CaSerpPage', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.add('default', () => (
		<CaSerpPage/>
	))
