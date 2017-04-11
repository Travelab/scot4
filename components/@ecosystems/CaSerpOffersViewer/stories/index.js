import obc from '@libs/obc'
import { storiesOf } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'
import { createWrapperDecorator } from '@utils/taffy/storybull-decorators'

import SerpOffersViewer from '../index.js'
import duck from '../ducks/index'
import saga from '../sagas/index'

obc.paginator._limit = 9

obc.setFilter({
	departDate: '2017-03-18',
	returnDate: '2017-03-21',
	src: 'locality:3074',
	dst: 'locality:3060',
	consist: [ 1, 0, 0 ]
}, 'clickavia')

storiesOf('SerpOffersViewer', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.addDecorator(createWrapperDecorator('#fff', 960))
	.add('default', () => (
		<SerpOffersViewer/>
	))
