import { storiesOf, action } from '@kadira/storybook'

import GalleryDots from '../index.js'

storiesOf('GalleryDots', module)
	.add('default', () => (
		<div style={{ padding: '10px', backgroundColor: '#ccc' }}>
			<GalleryDots count={3} position={1}/>
		</div>
	))
