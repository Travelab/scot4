import { storiesOf, action } from '@kadira/storybook'
import { createWrapperDecorator } from '@utils/taffy/storybull-decorators'

import CaSerpOffer from '../index.js'

import mock from '@libs/offer-mock'

const offer = mock({ shaped: false })


storiesOf('CaSerpOffer', module)
	.addDecorator(createWrapperDecorator('#e5e8e8', 305))
	.add('default', () => (
		<CaSerpOffer offer={offer} />
	))
