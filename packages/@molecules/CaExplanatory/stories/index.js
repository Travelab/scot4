import mock from '@libs/offer-mock'
import { storiesOf, action } from '@kadira/storybook'

import CaExplanatory from '../index.js'

const decorator = (getStory) => (
	<div style={{ fontFamily: 'HelveticaNeue' }}>
		{getStory()}
	</div>
)

const props = {
	offer: mock({ shaped: false }),
	showMotivation: true
}

storiesOf('CaExplanatory', module)
	.addDecorator(decorator)
	.add('default', () => (
		<CaExplanatory {...props}/>
	))
