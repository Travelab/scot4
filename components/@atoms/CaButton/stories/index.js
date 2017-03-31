import { storiesOf, action } from '@kadira/storybook'

import CaButton from '../index.js'

const blueStyle = {
	fontFamily: 'HelveticaNeue',
	padding: '10px',
	backgroundColor: '#1ba5d2',
	maxWidth: '240px'
}
const wrap = {
	maxWidth: '240px',
	fontFamily: 'Helvetica Neue'
}

storiesOf('CaButton', module)
	.add('new search', () => (
		<div style={blueStyle}>
			<CaButton title='Новый поиск' type='whiteUnderline'/>
		</div>
	))
	.add('all variants', () => {
		return (
			<div style={blueStyle}>
				<CaButton title='Все варианты' type='leftArrow'/>
			</div>
		)
	})
	.add('add passenger', () => {
		return (
			<div style={{ ...wrap, width: '174px' }}>
				<CaButton title='+ Взрослый или ребенок' hint='13425 Р' type='gray'/>
			</div>
		)
	})
	.add('add passenger without hint', () => {
		return (
			<div style={{ ...wrap, width: '174px' }}>
				<CaButton title='+ Взрослый или ребенок' type='gray'/>
			</div>
		)
	})
	.add('buy', () => {
		return (
			<div style={wrap}>
				<CaButton title='Купить' type='bigOrange'/>
			</div>
		)
	})
