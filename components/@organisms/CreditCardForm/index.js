import { createEnhancer } from '@utils/decoract'

import CardNumber from './CardNumber/index.jsx.js'
import Holder from './Holder/index.jsx.js'
import ExpirationDate from './ExpirationDate/index.jsx.js'
import CVV from './CVV/index.jsx.js'

import duck from './ducks/index.js'
import style from './styles/index.js'

import visaLogo from './img/visa_logo.svg'
import mcLogo from './img/mastercard_logo.svg'

const cq = {
	t414: {
		maxWidth: 414
	}
}

const enhancer = createEnhancer({
	duck,
	style,
	cq,
	withLang: false,
})

const CreditCardForm = ({ $, cq, state, actions, ditch, ...props }) => {

	const { t414 } = cq
	const { likeCardView } = props

	// Duck's state decomposition
	const {
		cardNumber,
		holder,
		expirationDate,
		cvv
	} = state

	// Duck's actions decomposition
	const {
		// card number
		setCardNumberValue,
		setCardNumberTouched,
		setCardNumberValidation,
		// holder
		setHolderValue,
		setHolderTouched,
		setHolderValidation,
		// expiration date
		setExpDateMonth,
		setExpDateYear,
		setExpDateTouched,
		setExpDateFocusedInput,
		setExpDateValidation,
		// cvv
		setCVVValue,
		setCVVTouched,
		setCVVValidation,
	} = actions

	const resetValidation = { isValid: false, errorMsg: '' }

	const propsCardNumber = {
		...cardNumber,
		t414,
		onClick: () => setCardNumberTouched(false),
		onBlur: () => {
			if (!cardNumber.isEmpty) setCardNumberTouched(true)
			else setCardNumberValidation(resetValidation)
		},
		onChange: setCardNumberValue
	}

	const propsHolder = {
		...holder,
		t414,
		onClick: () => setHolderTouched(false),
		onBlur: () => {
			if (!holder.isEmpty) setHolderTouched(true)
			else setHolderValidation(resetValidation)
		},
		onChange: setHolderValue
	}

	const propsExpDate = {
		...expirationDate,
		t414,
		onClick: () => setExpDateTouched(false),
		onBlur: () => {
			setExpDateFocusedInput('')
			if (!expirationDate.isEmpty) setExpDateTouched(true)
			else setExpDateValidation(resetValidation)
		},
		onMonthChange: setExpDateMonth,
		onYearChange: setExpDateYear,
		setFocusedInput: setExpDateFocusedInput
	}

	const propsCVV = {
		...cvv,
		t414,
		onClick: () => setCVVTouched(false),
		onBlur: () => {
			if (!cvv.isEmpty) setCVVTouched(true)
			else setCVVValidation(resetValidation)
		},
		onChange: setCVVValue
	}

	const CardLogo = ({ src, alt, className }) => (
		<div className={className}>
			<img src={src} alt={alt}/>
		</div>
	)

	const visaCard = {
		src: visaLogo,
		alt: 'visa',
		className: t414 ? $.t414VisaLogoWrapper : $.visaLogoWrapper
	}
	const masterCard = {
		src: mcLogo,
		alt: 'master card',
		className: t414 ? $.t414MastercardLogoWrapper: $.mastercardLogoWrapper
	}
	let cards = [visaCard, masterCard]
	if (cardNumber.value[0] === '4') cards.splice(1, 1)
	else if (cardNumber.value[0] === '5') cards.splice(0, 1)

	const CardLogosList = ({ cards, className }) => (
		<div className={className}>
			{cards.map( (card, i) => <CardLogo key={i} { ...card }/>)}
		</div>
	)

	const renderF414Layout = () => (
		<div className={$.container}>
			<div className={$.frontSide}>
				<div className={$.row}>
					<CardLogosList className={$.logos} cards={cards}/>
				</div>
				<div className={$.row}>
					<div className={$.cardNumberWrapper}>
						<CardNumber { ...propsCardNumber }/>
					</div>
				</div>
				<div className={$.row}>
					<div className={$.holderWrapper}>
						<Holder { ...propsHolder }/>
					</div>
					<div className={$.expDateWrapper}>
						<ExpirationDate { ...propsExpDate }/>
					</div>
				</div>
			</div>
			<div className={$.backSide}>
				<div className={$.backSideContent}>
					<div className={$.cvvWrapper}>
						<CVV { ...propsCVV }/>
					</div>
				</div>
			</div>
		</div>
	)

	const renderT414Layout = () => (
		<div className={$.t414Container}>
			<div className={$.t414Row}>
				<div className={$.t414CardNumberWrapper}>
					<CardNumber { ...propsCardNumber }/>
				</div>
				<CardLogosList className={$.t414Logos} cards={cards}/>
			</div>
			<div className={$.t414Row}>
				<div className={$.t414HolderWrapper}>
					<Holder { ...propsHolder }/>
				</div>
			</div>
			<div className={$.t414Row}>
				<div className={$.t414ExpDateWrapper}>
					<ExpirationDate { ...propsExpDate }/>
				</div>
				<div className={$.t414CvvWrapper}>
					<CVV { ...propsCVV }/>
				</div>
			</div>
		</div>
	)

	return likeCardView ? renderT414Layout() : renderF414Layout()
}

export default enhancer(CreditCardForm)
