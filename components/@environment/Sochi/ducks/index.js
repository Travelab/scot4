import { createDuck } from '@libs/lash'
import caSerpPageDuck from '@ecosystems/CaSerpPage/ducks'


const caSerpPageDitch = caSerpPageDuck.raiseDuckling()
const initialState = {}

export default createDuck({
	name: 'ClickaviaEnv',
	initialState,
	isfwl: false,
	ducklings: {
		caSerpPageDitch
	},
	transformations: {}
})
