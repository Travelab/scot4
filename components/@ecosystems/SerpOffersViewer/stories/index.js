import obc from '@libs/obc'
import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import SerpOffersViewer from '../index.js'
import duck from '../ducks/index'
import saga from '../sagas/index'

obc.setFilter({})

storiesOf('SerpOffersViewer', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.add('default', () => (
		<SerpOffersViewer/>
	))
