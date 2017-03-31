import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import Component from '../index.js'
import duck from '../ducks'

import hotel1 from './hotel1.png'
import hotel2 from './hotel2.png'

const images = [hotel1, hotel2]

storiesOf('HotelGallery', module)
	.addDecorator(createReduxSagaDecorator(duck))
	.add('default', () => (
		<Component images={images} width={270}/>
	))
