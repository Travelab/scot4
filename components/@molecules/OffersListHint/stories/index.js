import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import OffersListHint from '../index.js'
import duck from '../ducks/index'

const decorator = (getStory) => {
	return (
		<div style={{ backgroundColor: '#E3E3E3', height: '200px', padding: '20px' }}>
			{getStory()}
		</div>
	)
}

storiesOf('OffersListHint', module)
	.addDecorator(createReduxSagaDecorator(duck))
	.addDecorator(decorator)
	.add('default', () => (
		<OffersListHint/>
	))
