import mock from '@libs/offer-mock'
import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import PaymentDetails from '../index.js'
import duck from '../ducks'

const offer = mock({ shaped: false })
const props = {
	fares: offer.includedFares,
	totalPrice: offer.price,
	agreements: offer.agreements
}

const decorator = (getStory) => (
	<div style={{ backgroundColor: '#dbe5e8', fontFamily: 'HelveticaNeue', padding: '10px', width: '550px' }}>
		{getStory()}
	</div>
)

storiesOf('PaymentDetails', module)
	.addDecorator(createReduxSagaDecorator(duck))
	.addDecorator(decorator)
	.add('default', () => (
		<PaymentDetails {...props}/>
	))
