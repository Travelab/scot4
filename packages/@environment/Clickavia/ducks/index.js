import { createDuck } from '@libs/lash'

import checkoutPageDuck from '@ecosystems/CaCheckoutPage/ducks/index.js'

const checkoutPageDitch = checkoutPageDuck.raiseDuckling()

const initialState = {}

export default createDuck({
	name: 'ClickaviaEnv',
	initialState,
	isfwl: false,
	ducklings: {
		checkoutPageDitch
	},
	transformations: {}
})
