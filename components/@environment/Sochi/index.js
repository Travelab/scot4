import { configureStore } from '@libs/lash'
import { Provider } from 'react-redux'

import 'normalize.css'
import './styles/index.css'

import CaSerpPage from '@ecosystems/CaSerpPage'

import rootDuck from './ducks'
import rootSaga from './sagas'

const rootDitch = rootDuck.makeDitch()

const persistentStore = configureStore(rootDitch.reducer, rootDitch.initialState)
persistentStore.runSaga(rootSaga, rootDitch)

const Clickavia = () => {

	const { caSerpPageDitch } = rootDitch.getDitches()

	return (
		<div>
			<Provider store={persistentStore}>
				<CaSerpPage ditch={caSerpPageDitch}/>
			</Provider>
		</div>
	)
}

export default Clickavia
