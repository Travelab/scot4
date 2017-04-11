import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import FakeProgressBar from '../index.js'
import duck from '../ducks/index'
import saga from '../sagas/index'

import obc from '@libs/obc'

storiesOf('FakeProgressBar', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.add('default', () => (
		<div>
			<div style={{height: '5px', width: '100%'}}>
				<FakeProgressBar/>
			</div>
			<button onClick={obc.setFilter}>Start Loading</button>
		</div>
	))
