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

const CreditCardForm = ({ $, cq, state, actions, ditch }) => {

	const { t414 } = cq

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
		// holder
		setHolderValue,
		setHolderTouched,
		// expiration date
		setExpDateMonth,
		setExpDateYear,
		setExpDateTouched,
		setExpDateFocusedInput,
		// cvv
		setCVVValue,
		setCVVTouched
	} = actions

	const propsCardNumber = {
		...cardNumber,
		t414,
		onClick: () => setCardNumberTouched(false),
		onBlur: () => setCardNumberTouched(true),
		onChange: setCardNumberValue
	}

	const propsHolder = {
		...holder,
		t414,
		onClick: () => setHolderTouched(false),
		onBlur: () => setHolderTouched(true),
		onChange: setHolderValue
	}

	const propsExpDate = {
		...expirationDate,
		t414,
		onClick: () => setExpDateTouched(false),
		onBlur: () => {
			setExpDateFocusedInput('')
			setExpDateTouched(true)
		},
		onMonthChange: setExpDateMonth,
		onYearChange: setExpDateYear,
		setFocusedInput: setExpDateFocusedInput
	}

	const propsCVV = {
		...cvv,
		t414,
		onClick: () => setCVVTouched(false),
		onBlur: () => setCVVTouched(true),
		onChange: setCVVValue
	}

	const renderF414Layout = () => (
		<div className={$.container}>
			<div className={$.frontSide}>
				<div className={$.row}>
					<div className={$.logos}>
						<div className={$.visaLogoWrapper}>
							<img src={visaLogo} alt='visa'/>
						</div>
						<div className={$.mastercardLogoWrapper}>
							<img src={mcLogo} alt='master card'/>
						</div>
					</div>
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
				<div className={$.t414Logos}>
					<div className={$.t414VisaLogoWrapper}>
						<img src={visaLogo} alt='visa'/>
					</div>
					<div className={$.t414MastercardLogoWrapper}>
						<img src={mcLogo} alt='master card'/>
					</div>
				</div>
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

	return t414 ? renderT414Layout() : renderF414Layout()
}

export default enhancer(CreditCardForm)
