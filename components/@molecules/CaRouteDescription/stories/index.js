import { cloneDeep } from 'lodash'
import { storiesOf, action } from '@kadira/storybook'
import mock from '@libs/offer-mock'

import CaRouteDescription from '../index.js'

const addDays = (days) => {
	let result = new Date()
	result.setDate(result.getDate() + days)
	return result
}

const props = {
	offer: mock({ shaped: false })
}

const decorator = (getStory) => (
	<div style={{ backgroundColor: '#1ba5d2', fontFamily: 'HelveticaNeue' }}>
		{getStory()}
	</div>
)

storiesOf('CaRouteDescription', module)
	.addDecorator(decorator)
	.add('RT', () => (
		<CaRouteDescription {...props}/>
	))
	.add('OW', () => {
		const propsOW = cloneDeep(props)
		propsOW.offer.flights = [ propsOW.offer.flights[0] ]
		return <CaRouteDescription {...propsOW}/>
	})
	.add('consist(2, 1, 0)', () => {
		const props210 = cloneDeep(props)
		props210.offer.flights[0].segments[0].consist = [ 2, 1, 0 ]
		return <CaRouteDescription {...props210}/>
	})
	.add('consist(1, 2, 1)', () => {
		const props121 = cloneDeep(props)
		props121.offer.flights[0].segments[0].consist = [ 1, 2, 1 ]
		return <CaRouteDescription {...props121}/>
	})
