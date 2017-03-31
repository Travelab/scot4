import { Provider } from 'react-redux'

import configureStore from './configure-store.js'

export const createReduxSagaDecorator = (duck, saga) => {

	const ditch = duck.makeDitch()

	const store = configureStore(ditch.reducer, ditch.initialState)

	saga && store.runSaga(saga.bind(saga, ditch))

	return (getStory) => {

		return (
			<Provider store={store}>
				{React.cloneElement(getStory(), { ditch })}
			</Provider>
		)
	}
}

