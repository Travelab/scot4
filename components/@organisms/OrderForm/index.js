import { createEnhancer } from '@utils/decoract'
import { omit } from 'lodash'
import { makeCX } from '@utils/taffy'

import Section from './Section.jsx.js'
import PciCompliance from '@atoms/PciCompliance'
import PaymentDetails from '@molecules/PaymentDetails'
import CreditCardForm from '@organisms/CreditCardForm'
import CustomerForm from '@organisms/CustomerForm'
import PassengersDataList from '@organisms/PassengersDataList'
import ValidationErrors from './ValidationErrors.jsx.js'

import duck from './ducks/index.js'
import style from './styles/index.js'

const cx = makeCX()
const cq = {
	t414: {
		maxWidth: 414
	},
	f415t768: {
		minWidth: 415,
		maxWidth: 768
	},
}

const enhancer = createEnhancer({
	duck,
	style,
	cq
})

class OrderForm extends React.Component {

	render () {
		const { $, l, cq, ditch, state, ...props } = this.props
		const { t414, f415t768 } = cq
		const {
			paymentDetailsDitch,
			creditCardDitch,
			customerFormDitch,
			passengersDataListDitch
		} = ditch.getDitches()

		const { validationErrors } = state
		const errorsFormsState = validationErrors && validationErrors.map((err) => {
			let formState = ditch.getDitch(err.type + 'Ditch').getState(state)
			if (err.type === 'passengersDataList') {
				formState = formState.$['passengersForm.1.0'][err.formId]
				if (formState.withoutDocValidity) {
					formState = omit(formState, [ 'documentValidity' ])
				}
			}
			return {
				...err,
				state: omit(formState, [ 'isValid' ])
			}
		})

		const { offer, order, paymentProcessing } = props

		// UI-text
		const txtPassengersHeader = l('Данные пассажиров')
		const txtPassengersCaption = l('Нужно вводить ')
		const txtPassengersCaption1 = l('точно так же, как в документе')
		const passengersCaption = (
			<span>
				{txtPassengersCaption}
				<span style={{ fontWeight: 600 }}>{txtPassengersCaption1}</span>
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
		const currentDate = new Date()
		const expireAt = offer && currentDate.setMinutes(currentDate.getMinutes() + 30)
		const paymentWhenClass = t414 ? $.paymentWhen : null
		const propsSectionPayment = {
			t414: t414 || f415t768,
			data: {
				header: (
					<span>
						{txtPaymentHeader} <span className={paymentWhenClass} style={{ color: '#777' }}>{txtPaymentWhenHeader(expireAt)}</span>
					</span>
				),
			}
		}

		const propsPaymentDetails = {
			order,
			paymentProcessing,
			validationErrors,
			totalPrice: offer.price,
			fares: offer.includedFares,
			agreements: offer.agreements,
			isCharter: offer.ticketsType === 'charter'
		}

		const customerFormWrapperClass = cx({
			[$.customerFormWrapper]: !t414 && !f415t768,
			[$.t414CustomerFormWrapper]: t414 || f415t768
		})
		const paymentSectionClass = cx({
			[$.paymentSection]: !t414 && !f415t768,
			[$.t414PaymentSection]: t414 || f415t768
		})
		const paymentClass = cx({
			[$.payment]: !t414 && !f415t768,
			[$.t414Payment]: t414 || f415t768
		})
		const securityInfoClass = cx({
			[$.securityInfo]: !t414 && !f415t768,
			[$.t414SecurityInfo]: t414 || f415t768
		})
		const cardClass = cx({
			[$.card]: !t414 && !f415t768,
			[$.t414Card]: t414 || f415t768
		})

		const orderedForms = [ 'passengersDataList', 'customerForm', 'creditCard' ]
		const orderFormByRender = (a, b) => (
			orderedForms.indexOf(a.type) - orderedForms.indexOf(b.type)
		)
		const propsValidationErrors = {
			forms: errorsFormsState && errorsFormsState.sort(orderFormByRender),
			formsNodes: {
				creditCard: this.refs.creditCardFormNode,
				customerForm: this.refs.customerFormNode,
				passengersDataList: this.refs.passengersDataListNode,
			}
		}

		return (
			<div className={$.container}>
				<Section {...propsSectionPassengers}>
					<div className={$.passengersDataListWrapper} ref='passengersDataListNode'>
						<PassengersDataList ditch={passengersDataListDitch}/>
					</div>
				</Section>
				<Section {...propsSectionCustomer}>
					<div className={customerFormWrapperClass} ref='customerFormNode'>
						<CustomerForm ditch={customerFormDitch}/>
					</div>
				</Section>
				<Section {...propsSectionPayment}>
					<div className={paymentSectionClass}>
						<div className={paymentClass}>
							<div className={cardClass} ref='creditCardFormNode'>
								<CreditCardForm ditch={creditCardDitch} likeCardView={t414 || f415t768}/>
							</div>
							<div className={securityInfoClass}>
								<PciCompliance/>
							</div>
						</div>
						<div className={$.buy}>
							<PaymentDetails ditch={paymentDetailsDitch} {...propsPaymentDetails}/>
						</div>
					</div>
					<div className={$.validationWrapper}>
						<ValidationErrors {...propsValidationErrors}/>
					</div>
				</Section>
			</div>
		)
	}
}

export default enhancer(OrderForm)
