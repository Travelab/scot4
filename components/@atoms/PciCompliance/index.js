import { createEnhancer } from '@utils/decoract'

import style from './styles/index.js'
import lockImg from './images/lock.svg'
import certImg from './images/digicert.svg'

const enhancer = createEnhancer({
	style,
})

const PciCompliance = ({ $, l }) => {
	const txtProcessing = l(`Данные вашей карты обрабатываются платежным центром ПАО Банк «ФК Открытие» 
		и защищены 256-битным ключом шифрования, предоставленным компанией DigiCert.`)
	const txtPciCompliance = l(`Сайт в полной мере отвечает стандартам безопасности платёжных систем Visa и 
		MasterCard (PCI compliance). Процессинг платежей осуществляется компанией Payture.`)
	const txtSafety = l(`Мы не сохраняем у себя данные вашей карты. 
		Таким образом, транзакция для Вас абсолютно безопасна.`)

	return (
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
		</div>
	)
}

export default enhancer(PciCompliance)
