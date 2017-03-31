import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import Component from '../index.js'
import duck from '../ducks'

storiesOf('DoubleNestedStore', module)
	.addDecorator(createReduxSagaDecorator(duck))
	.add('default', () => (
		<Component/>
	))

