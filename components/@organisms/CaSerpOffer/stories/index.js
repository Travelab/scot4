import { storiesOf } from '@kadira/storybook'
import { createWrapperDecorator } from '@utils/taffy/storybull-decorators'
import mock from '@libs/offer-mock'
import CaSerpOffer from '../index.js'


const offer = mock({ shaped: false })

storiesOf('CaSerpOffer', module)
	.addDecorator(createWrapperDecorator('#e5e8e8', 305))
	.add('default', () => (
		<CaSerpOffer offer={offer}/>
	))