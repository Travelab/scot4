import { createEnhancer } from '@utils/decoract'
import { LocalProvider, configureStore } from '@libs/lash'

import 'normalize.css'
import './styles/index.css'

import SerpPage from '@ecosystems/SerpPage'
import serpPageDuck from '@ecosystems/SerpPage/ducks'

import rootReducer from './ducks/index.js'
import rootSaga from './sagas/index.js'

const persistentStore = configureStore(rootReducer)
persistentStore.runSaga(rootSaga)

const Togliatti = () => {

	return (
		<div>
			<LocalProvider store={persistentStore} branch={serpPageDuck.branch}>
				<SerpPage/>
			</LocalProvider>
		</div>
	)
}

export default Togliatti
