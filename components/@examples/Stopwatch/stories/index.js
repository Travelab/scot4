import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import Component from '../index.js'
import duck from '../ducks'
import saga from '../sagas'

storiesOf('Stopwatch', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.add('default', () => (
		<Component/>
	))


/*console.log(2342342);
if (module.hot) {

	module.hot.accept(() => {
		console.log(87777);
	})

console.log(123);
	module.hot.dispose(() => {
		console.log(543);
	})

	module.hot.accept('../ducks', () => {
		console.log(7797)
		//store.replaceReducer(require('../ducks'))
		//store.dispatch(storeDidHotReload())
	})
}*/