import obc from '@libs/obc'
import { StickyContainer } from '@libs/velcro'
import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import duck from '../ducks/index'
import saga from '../sagas/index'
import SerpMap from '../index.js'

obc.setFilter({})

const decorator = (getStory) => (
	<StickyContainer>
		<div>
			<div style={{ height: '120px' }}/>
			{getStory()}
			<div style={{ height: '820px' }}/>
		</div>
	</StickyContainer>
)

storiesOf('SerpMap', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.addDecorator(decorator)
	.add('default', () => (
		<SerpMap/>
	))
	.add('fullScreen', () => (
		<SerpMap fullScreen={true}/>
	))
