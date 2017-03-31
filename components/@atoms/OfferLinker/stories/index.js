import { storiesOf, action } from '@kadira/storybook'

import OfferLinker from '../index.js'

storiesOf('OfferLinker', module)
	.add('default', () => (
		<OfferLinker offerId='111'>
			<div>tst link</div>
		</OfferLinker>
	))
