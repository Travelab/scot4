import { createDuck, untouch } from '@libs/lash'


const initialState = {
	isOpenedTariffRules: false,
	tariffRulesIdx: {}
}

export default createDuck({
	name: 'orderTicketsInfo',
	initialState,
	transformations: {
		openTariffRules: (state, { payload: idx }) => ({
			...state,
			isOpenedTariffRules: true,
			tariffRulesIdx: idx
		}),
		closeTariffRules: (state) => ({
			...state,
			isOpenedTariffRules: false,
			tariffRulesIdx: {}
		}),
		clickHandler: untouch
		// doNothing: untouch,
	}
})
