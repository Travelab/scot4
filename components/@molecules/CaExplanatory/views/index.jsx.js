import { createEnhancer } from '@utils/decoract'
import { layouts } from '@utils/taffy'
import { find } from 'lodash'

import T414 from './layouts/t414.jsx.js'
import F415t768 from './layouts/f415t768.jsx.js'
import F769 from './layouts/f769.jsx.js'

const cq = {
	t414: {
		maxWidth: 414,
	},
	f415t768: {
		minWidth: 415,
		maxWidth: 768
	}
}
const enhancer = createEnhancer({ cq })

const MainView = ({ l, cq, ...props }) => {
	const { t414, f415t768 } = cq
	const { suppliersCount, price, ticketsType, isOrderReady } = props

	const txtTech = l(`Наша технология позволяет комбинировать авиабилеты от 
	{count, selectordinal,
		=0 {}
		=1 {}
		=2 {двух}
		=3 {трех}
		=4 {четырех}
		=5 {пяти}
		=6 {шести}
		other {#}
	} разных надежных поставщиков.`, { count: suppliersCount })
	const txtTechHint = l('Поэтому у нас так дешево.')
	const txtTickets = l('Вы оплачиваете прямо здесь и получаете электронные билеты.')
	const txtPayment = l('Оплата автоматически уходит нашим поставщикам')
	const txtPrice = l(`Итоговая стоимость за всех пассажиров — {price} рублей`, {
		price: l.number(price)
	})
	const txtPriceHint = l('При оплате банковской картой')

	const propsLayout = {
		txtTech,
		txtTechHint,
		txtTickets,
		txtPayment,
		txtPrice,
		txtPriceHint,
		isOrderReady,
		ticketsType
	}

	const Layout = layouts([
		[ T414, t414 ],
		[ F415t768, f415t768 ],
		[ F769, (!t414 && !f415t768) ]
	])

	return <Layout {...propsLayout}/>
}

export default enhancer(MainView)
