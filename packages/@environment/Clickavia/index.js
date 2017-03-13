import { createEnhancer } from '@utils/decoract'
import { configureStore } from '@libs/lash'
import { Provider } from 'react-redux'

import 'normalize.css'
import './styles/index.css'

import CaCheckoutPage from '@ecosystems/CaCheckoutPage'

import rootDuck from './ducks/index.js'
import rootSaga from './sagas/index.js'

const rootDitch = rootDuck.makeDitch()

const persistentStore = configureStore(rootDitch.reducer, rootDitch.initialState)
persistentStore.runSaga(rootSaga, rootDitch)

const Clickavia = () => {

	const { checkoutPageDitch } = rootDitch.getDitches()

	return (
		<div>
			<Provider store={persistentStore}>
				<CaCheckoutPage ditch={checkoutPageDitch}/>
			</Provider>
		</div>
	)
}

export default Clickavia
