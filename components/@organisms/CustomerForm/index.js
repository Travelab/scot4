import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import Email from './Email/index.jsx.js'
import Phone from './Phone/index.jsx.js'

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

const CustomerForm = ({ $, cq, state, actions, ditch }) => {
	const { t414 } = cq

	// Duck's state decomposition
	const { email, phone } = state

	// Duck's actions decomposition
	const {
		// email
		setEmailValue,
		setEmailTouched,
		setEmailValidation,
		// phone
		setPhoneValue,
		setPhoneTouched,
		setPhoneValidation,
	} = actions
	const resetValidation = { isValid: false, errorMsg: '' }

	const propsEmail = {
		...email,
		t414,
		onClick: () => setEmailTouched(false),
		onBlur: () => {
			if(!email.isEmpty) setEmailTouched(true)
			else setEmailValidation(resetValidation)
		},
		onChange: setEmailValue
	}

	const propsPhone = {
		...phone,
		t414,
		onClick: () => setPhoneTouched(false),
		onBlur: () => {
			if(!phone.isEmpty) setPhoneTouched(true)
			else setPhoneValidation(resetValidation)
		},
		onChange: setPhoneValue
	}

	const emailWrapperClass = cx({
		[$.emailWrapper]: !t414,
		[$.t414EmailWrapper]: t414
	})
	const phoneWrapperClass = cx({
		[$.phoneWrapper]: !t414,
		[$.t414PhoneWrapper]: t414
	})

	return (
		<div className={$.container}>
			<div className={emailWrapperClass}>
				<Email { ...propsEmail }/>
			</div>
			<div className={phoneWrapperClass}>
				<Phone { ...propsPhone }/>
			</div>
		</div>
	)
}

export default enhancer(CustomerForm)
