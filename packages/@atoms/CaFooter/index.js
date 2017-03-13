import { createEnhancer } from '@utils/decoract'
import confy from '@utils/confy'

import style from './styles/index.js'

const enhancer = createEnhancer({
	style,
})

const CaFooter = ({ $, l, ...props }) => {
	const conf = confy.get('CONTACTS.clickavia')

	return (
		<div className={$.container}>
			<div className={$.info}>
				<div className={$.title}>
					© {conf.foundationYear}-{(new Date()).getFullYear()} {conf.title}
				</div>
				<div className={$.contacts}>
					<div>{conf.phone}</div>
					<div><a href={`mailto:${conf.email}`}>{conf.email}</a></div>
				</div>
			</div>
			<div className={$.links}>
					<div><a href='https://clickavia.ru/about'>О компании</a></div>
					<div><a href='https://clickavia.ru/'>Как купить билет</a></div>
					<div><a href='https://clickavia.ru/terms-of-use'>Пользовательское соглашение</a></div>
					<div><a href='https://clickavia.ru/contacts'>Контактная информация</a></div>
			</div>
		</div>
	)
}

export default enhancer(CaFooter)
