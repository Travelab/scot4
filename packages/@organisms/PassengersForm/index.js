import { createEnhancer } from '@utils/decoract'

import FirstName from './FirstName/index.jsx.js'
import LastName from './LastName/index.jsx.js'
import BirthDate from './BirthDate/index.jsx.js'
import Citizenship from './Citizenship/index.jsx.js'
import DocumentNumber from './DocumentNumber/index.jsx.js'
import Gender from './Gender/index.jsx.js'
import DocumentTypeComp from './DocumentTypeComponent/index.jsx.js'
import DocumentValidity from './DocumentValidity/index.jsx.js'

import duck from './ducks/index.js'
import style from './styles/index.js'

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

const PassengersForm = ({ $, l, cq, state, actions, ditch, ...props }) => {

	const { t414 } = cq

	// Duck's state decomposition
	const {
		firstName,
		lastName,
		birthDate,
		citizenship,
		documentNumber,
		gender,
		documentType,
		documentValidity
	} = state

	// Duck's actions decomposition
	const {
		// first name
		setFirstNameValue,
		setFirstNameTouched,
		// last name
		setLastNameValue,
		setLastNameTouched,
		// birth date
		setBirthDateDay,
		setBirthDateMonth,
		setBirthDateYear,
		setBirthDateTouched,
		setBirthDateFocusedInput,
		// citizenship
		activateCitizenship,
		deactivateCitizenship,
		setCitizenshipInputValue,
		filterCitizenships,
		setCitizenshipHoveredIdx,
		// document number
		setDocNumValue,
		setDocNumTouched,
		// sex
		setGenderValue,
		setGenderTouched,
		// document type
		activateDocType,
		deactivateDocType,
		setDocTypeValue,
		setDocTypeHoveredIdx,
		setDocTypeCode,
		// document validity
		setDocValidityDay,
		setDocValidityMonth,
		setDocValidityYear,
		setDocValidityTouched,
		setDocValidityFocusedInput
	} = actions

	const { formName } = props

	const propsFirstName = {
		...firstName,
		t414,
		onClick: () => setFirstNameTouched(false),
		onBlur: () => setFirstNameTouched(true),
		onChange: setFirstNameValue
	}

	const propsLastName = {
		...lastName,
		t414,
		onClick: () => setLastNameTouched(false),
		onBlur: () => setLastNameTouched(true),
		onChange: setLastNameValue
	}

	const propsBirthDate = {
		...birthDate,
		t414,
		onClick: () => setBirthDateTouched(false),
		onBlur: () => {
			setBirthDateFocusedInput('')
			setBirthDateTouched(true)
		},
		onDayChange: setBirthDateDay,
		onMonthChange: setBirthDateMonth,
		onYearChange: setBirthDateYear,
		setFocusedInput: setBirthDateFocusedInput
	}

	const propsCitizenship = {
		...citizenship,
		t414,
		onClick: activateCitizenship,
		onBlur: deactivateCitizenship,
		setInputValue: setCitizenshipInputValue,
		filterCitizenships: filterCitizenships,
		setHoveredIdx: setCitizenshipHoveredIdx
	}

	const propsDocNum = {
		...documentNumber,
		t414,
		documentType: documentType.code,
		onClick: () => setDocNumTouched(false),
		onBlur: () => setDocNumTouched(true),
		onChange: setDocNumValue
	}

	const propsGender = {
		...gender,
		t414,
		radioName: formName,
		onFocus: () => setGenderTouched(false),
		onBlur: () => setGenderTouched(true),
		onChange: setGenderValue
	}

	const propsDocumentType = {
		...documentType,
		t414,
		onClick: activateDocType,
		onBlur: deactivateDocType,
		onSelect: setDocTypeValue,
		setHoveredIdx: setDocTypeHoveredIdx,
		setCode: setDocTypeCode
	}

	const propsDocValidity = {
		...documentValidity,
		t414,
		onClick: () => setDocValidityTouched(false),
		onBlur: () => {
			setDocValidityFocusedInput('')
			setDocValidityTouched(true)
		},
		onDayChange: setDocValidityDay,
		onMonthChange: setDocValidityMonth,
		onYearChange: setDocValidityYear,
		setFocusedInput: setDocValidityFocusedInput
	}

	const renderDocValidity = (wrapperClass) => (
		<div className={wrapperClass}>
			<DocumentValidity { ...propsDocValidity } />
		</div>
	)

	const renderF414Layout = () => (
		<div className={$.container}>
			<div className={$.row}>
				<div className={$.firstNameWrapper}>
					<FirstName { ...propsFirstName } />
				</div>
				<div className={$.lastNameWrapper}>
					<LastName { ...propsLastName } />
				</div>
			</div>
			<div className={$.row}>
				<div className={$.citizenshipWrapper}>
					<Citizenship { ...propsCitizenship } />
				</div>
				<div className={$.birthDateWrapper}>
					<BirthDate { ...propsBirthDate } />
				</div>
				<div className={$.genderRadioWrapper}>
					<Gender { ...propsGender } />
				</div>
			</div>
			<div className={$.row}>
				<div className={$.documentTypeWrapper}>
					<DocumentTypeComp { ...propsDocumentType } />
				</div>
				<div className={$.docNumWrapper}>
					<DocumentNumber { ...propsDocNum } />
				</div>
				{documentType.code === 'travel-passport' ? renderDocValidity($.docValidityWrapper) : null}
			</div>
		</div>
	)

	const renderT414Layout = () => (
		<div className={$.container}>
			<div className={$.row}>
				<div className={$.t414FirstNameWrapper}>
					<FirstName { ...propsFirstName } />
				</div>
				<div className={$.t414BirthDateWrapper}>
					<BirthDate { ...propsBirthDate } />
				</div>
			</div>
			<div className={$.row}>
				<div className={$.t414LastNameWrapper}>
					<LastName { ...propsLastName } />
				</div>
				<div className={$.t414GenderRadioWrapper}>
					<Gender { ...propsGender } />
				</div>
			</div>
			<div className={$.row}>
				<div className={$.t414CitizenshipWrapper}>
					<Citizenship { ...propsCitizenship } />
				</div>
			</div>
			<div className={$.row}>
				<div className={$.t414DocumentTypeWrapper}>
					<DocumentTypeComp { ...propsDocumentType } />
				</div>
			</div>
			<div className={$.row}>
				<div className={$.t414DocNumWrapper}>
					<DocumentNumber { ...propsDocNum } />
				</div>
				{documentType.code === 'travel-passport' ? renderDocValidity($.t414DocValidityWrapper) : null}
			</div>
		</div>
	)

	return t414 ? renderT414Layout() : renderF414Layout()
}

export default enhancer(PassengersForm)
