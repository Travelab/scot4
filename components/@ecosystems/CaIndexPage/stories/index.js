import { storiesOf, action } from '@kadira/storybook'
import { createWrapperDecorator } from '@utils/taffy/storybull-decorators'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import CaIndexPage from '../index.js'
import duck from '../ducks'
import saga from '../sagas'

storiesOf('CaIndexPage', module)
	.addDecorator(createReduxSagaDecorator(duck, saga))
	.add('default', () => (
		<CaIndexPage/>
	))
	.addDecorator(createWrapperDecorator('#d8e5e7', 960))
	.add('if width 960', () => (
		<CaIndexPage/>
	))
	.addDecorator(createWrapperDecorator('#d8e5e7', 320))
	.add('if width 320', () => (
		<CaIndexPage/>
	))

