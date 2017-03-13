import obc from '@libs/obc'
import { StickyContainer } from '@libs/velcro'
import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import SerpSearchResults from '../index.js'
import duck from '../ducks'
import saga from '../sagas'

obc.setFilter({})

const decorator = (getStory) => (
	<StickyContainer>
			{getStory()}
	</StickyContainer>
)

storiesOf('SerpSearchResults', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.addDecorator(decorator)
	.add('default', () => (
		<SerpSearchResults/>
	))
	.add('only offers list', () => (
		<SerpSearchResults isMapActivated={false}/>
	))
	.add('only map', () => (
		<SerpSearchResults isOffersListActivated={false}/>
	))

