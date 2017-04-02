import locale from '../switchers/locale.js'


export default {
	clickavia: {
		defaultAgreement: locale({
			default: {
				id: 'travelabAgent',
				link: 'https://s3-ap-southeast-1.amazonaws.com/prod-clickavia-docs/travelab_agreement.pdf'
			},
			'ru-RU': {
				title: 'публичной оферты ООО «Тревелаб Агент»',
			},
		}),
	}
}
