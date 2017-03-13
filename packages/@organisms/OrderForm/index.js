import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import Section from './Section.jsx.js'
import PciCompliance from '@atoms/PciCompliance'
import PaymentDetails from '@molecules/PaymentDetails'
import CreditCardForm from '@organisms/CreditCardForm'
import CustomerForm from '@organisms/CustomerForm'
import PassengersDataList from '@organisms/PassengersDataList'

import duck from './ducks/index.js'
import style from './styles/index.js'

const cx = makeCX()
const cq = {
	t414: {
		maxWidth: 414
	}
}

const enhancer = createEnhancer({
	duck,
	style,
	cq
})

const OrderForm = ({ $, l, cq, ditch, state, ...props }) => {
	const { t414 } = cq
	const {
		paymentDetailsDitch,
		creditCardDitch,
		customerFormDitch,
		passengersDataListDitch
	} = ditch.getDitches()

	const { validationErrors } = state

	const { offer, order, paymentProcessing } = props

	// UI-text
	const txtPassengersHeader = l('Данные пассажиров')
	const txtPassengersCaption = l('Нужно вводить ')
	const txtPassengersCaption1 = l('точно так же, как в документе')
	const passengersCaption = (
		<span>
			{txtPassengersCaption}
			<span style={{fontWeight: 600}}>{txtPassengersCaption1}</span>
		</span>
	)
	const txtCustomerHeader = l('Данные покупателя')
	const txtCustomerCaption = l(`
		Для того, чтобы информировать вас о ходе обработки заказа и для связи с вами в случае изменений
	`)
	const txtPaymentHeader = l('Оплата')
	const txtPaymentWhenHeader = (expires) => {
		return l(`(нужно оплатить до
			{expires, time, short}
			{expires, date, shortMonth})`, { expires })
	}
	const txtPaymentCaption = l('Итоговая стоимость зависит от способа оплаты')

	const propsSectionPassengers = {
		t414,
		data: {
			header: txtPassengersHeader,
			caption: passengersCaption,
		}
	}
	const propsSectionCustomer = {
		t414,
		data: {
			header: txtCustomerHeader,
			caption: txtCustomerCaption,
		}
	}
	const expireAt = offer && offer.expireAt
	const paymentWhenClass = t414 ? $.paymentWhen : null
	const propsSectionPayment = {
		t414,
		data: {
			header: (
				<span>
					{txtPaymentHeader} <span className={paymentWhenClass} style={{ color: '#777' }}>{txtPaymentWhenHeader(expireAt)}</span>
				</span>
			),
			caption: txtPaymentCaption,
		}
	}

	const propsPaymentDetails = {
		order,
		paymentProcessing,
		validationErrors,
		totalPrice: offer.price,
		fares: offer.includedFares,
		agreements: offer.agreements
	}

	const customerFormWrapperClass = cx({
		[$.customerFormWrapper]: !t414,
		[$.t414CustomerFormWrapper]: t414
	})
	const paymentSectionClass = cx({
		[$.paymentSection]: !t414,
		[$.t414PaymentSection]: t414
	})
	const paymentClass = cx({
		[$.payment]: !t414,
		[$.t414Payment]: t414
	})
	const securityInfoClass = cx({
		[$.securityInfo]: !t414,
		[$.t414SecurityInfo]: t414
	})
	const cardClass = cx({
		[$.card]: !t414,
		[$.t414Card]: t414
	})

	const txtValidationErrorsTitle = l('Пожалуйста, проверьте правильность и полноту введенных данных в следующих формах:')
	const errorsMap = {
		card: l('Банковская карта'),
		customerForm: l('Данные покупателя'),
		passenger: l('Данные пассажира ')
	}

	const renderErrorMsg = ({ type, index }, i) => (
		<div className={$.errorMsg} key={i}>
			{errorsMap[type]}
			{index !== undefined ? index + 1 : null}
		</div>
	)
	const renderValidationErrors = () => (
		<div className={$.validationErrors}>
			<div className={$.validationTitle}>{txtValidationErrorsTitle}</div>
			<div className={$.validationContent}>
				{ validationErrors.map(renderErrorMsg) }
			</div>
		</div>
	)

	return (
		<div className={$.container}>
			<Section {...propsSectionPassengers}>
				<div className={$.passengersDataListWrapper}>
					<PassengersDataList ditch={passengersDataListDitch}/>
				</div>
			</Section>
			<Section {...propsSectionCustomer}>
				<div className={customerFormWrapperClass}>
					<CustomerForm ditch={customerFormDitch}/>
				</div>
			</Section>
			<Section {...propsSectionPayment}>
				<div className={paymentSectionClass}>
					<div className={paymentClass}>
						<div className={cardClass}>
							<CreditCardForm ditch={creditCardDitch}/>
						</div>
						<div className={$.buy}>
							<PaymentDetails ditch={paymentDetailsDitch} {...propsPaymentDetails}/>
						</div>
					</div>
					<div className={securityInfoClass}>
						<PciCompliance isShort={t414}/>
					</div>
				</div>
			{ validationErrors ? renderValidationErrors() : null }
			</Section>
		</div>
	)
}

export default enhancer(OrderForm)
