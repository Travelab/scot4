import { createEnhancer } from '@utils/decoract'

import style from './styles/index.js'
import lockImg from './images/lock.svg'
import certImg from './images/digicert.svg'

const enhancer = createEnhancer({
	style,
})

const PciCompliance = ({ $, l, ...props }) => {
	const { isShort } = props
	const txtProcessing = l(`Данные вашей карты обрабатываются платежным центром ПАО Банк «ФК Открытие» 
		и защищены 256-битным ключом шифрования, предоставленным компанией DigiCert.`)
	const txtPciCompliance = l(`Сайт в полной мере отвечает стандартам безопасности платёжных систем Visa и 
		MasterCard (PCI compliance). Процессинг платежей осуществляется компанией Payture.`)
	const txtSafety = l(`Мы не сохраняем у себя данные вашей карты. 
		Таким образом, транзакция для Вас абсолютно безопасна.`)
	const txtBuy = isShort ? l('Оплатить') : l('Купить')
	const txtAfterBuy = l(`После нажатия кнопки «${txtBuy}» итоговая стоимость будет списана
		с вашей карты и в течение пяти минут вы получите подтверждение
		вашего заказа на указанный адрес электронной почты.`)

	const renderAll = () => (
		<div className={$.container}>
			<div className={$.icons}>
				<img src={lockImg}/>
				<img src={certImg}/>
			</div>
			<div className={$.info}>
				<p>{txtProcessing}</p>
				<p>{txtPciCompliance}</p>
				<p>{txtSafety}</p>
			</div>
			<div className={$.afterBuy}>
				{txtAfterBuy}
			</div>
		</div>
	)

	const renderOnlyAfterBuy = () => (
		<div className={$.container}>
			<div className={$.afterBuy}>
				{txtAfterBuy}
			</div>
		</div>
	)

	return isShort ? renderOnlyAfterBuy() : renderAll()
}

export default enhancer(PciCompliance)
