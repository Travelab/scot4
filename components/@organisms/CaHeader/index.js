import { createEnhancer } from '@utils/decoract'
import Isvg from 'react-inlinesvg'

import style from './styles/index.js'
import logo from './images/clickavia.svg'


const cq = {
	t600: {
		maxWidth: 600,
	}
}

const enhancer = createEnhancer({
	cq,
	style,
})

const CaHeader = ({ $, cq, l }) => {

	// Component Query decomposition
	const { t600 } = cq

	// UI-text
	const txtAviatickets = l('Авиабилеты')
	const txtTicketsHotels = l('Билеты+Отели')
	const txtPhone = l('+7 (495) 646-22-66')
	const txtLogin = l('Вход')

	return (
		<div className={$.headerWrapper}>
			<div className={t600 ? $.smallContainer : $.container}>
				<div className={t600 ? $.smallLeftContainer : $.leftContainer}>
					<div className={$.logoContainer}>
						<Isvg src={logo}/>
					</div>
					<div className={$.menuContainer}>
						<div className={$.menuItem}>
							<p>{txtAviatickets}</p>
						</div>
						<div className={$.menuItem}>
							<p>{txtTicketsHotels}</p>
						</div>
					</div>
				</div>
				<div className={t600 ? $.smallRightContainer : $.rightContainer}>
					<div className={$.menuItem}>
						<p>{txtPhone}</p>
					</div>
					<div className={$.menuItem}>
						<p>{txtLogin}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default enhancer(CaHeader)