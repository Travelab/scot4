import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'
import mock from '@libs/offer-mock'

import CaCheckoutPage from '../index.js'
import duck from '../ducks/index.js'
import saga from '../sagas/index.js'

import Offer from '@libs/offer'

const addDays = (days) => {
	let result = new Date()
	result.setDate(result.getDate() + days)
	return result
}
const addMinutes = (minutes) => {
	let result = new Date()
	result.setMinutes(result.getMinutes() + minutes)
	return result
}

storiesOf('CaCheckoutPage', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.add('default', () => (
		<CaCheckoutPage/>
	))
