import { storiesOf, action } from '@kadira/storybook'
import { createWrapperDecorator } from '@utils/taffy/storybull-decorators'

import CaIndexPage from '../index.js'

storiesOf('CaIndexPage', module)
	.add('default', () => (
		<CaIndexPage/>
	))
	.addDecorator(createWrapperDecorator('#d8e5e7', 960))
	.add('width960', () => (
		<CaIndexPage/>
	))
	.addDecorator(createWrapperDecorator('#d8e5e7', 320))
	.add('width320', () => (
		<CaIndexPage/>
	))
	