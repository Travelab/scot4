import obc from '@libs/obc'
import { storiesOf } from '@kadira/storybook'
import { createWrapperDecorator } from '@utils/taffy/storybull-decorators'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import CaSerpOffersList from '../index.js'
import duck from '../ducks/index.js'
import saga from '../sagas/index.js'

obc.setFilter({
	departDate: '2017-03-18',
	returnDate: '2017-03-21',
	src: 'locality:3074',
	dst: 'locality:3060',
	consist: [ 1, 0, 0 ]
}, 'clickavia')

storiesOf('CaSerpOffersList')
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.addDecorator(createWrapperDecorator('#fff', 960))
	.add('default', () => (
		<CaSerpOffersList/>
	))

storiesOf('CaSerpOffersList')
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.addDecorator(createWrapperDecorator('#BFE089', 320))
	.add('mobile', () => (
		<CaSerpOffersList/>
	))
