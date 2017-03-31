import scrollIntoView from 'scroll-into-view'
import { createEnhancer } from '@utils/decoract'
import { pickBy, keys, flatten } from 'lodash'

import CaButton from '@atoms/CaButton'

import style from './styles/validationErrors.js'

const enhancer = createEnhancer({
	style,
})

const txtFieldSelector = `{field, select,
	cardNumber {номер банковской карты}
	holder {имя владельца банковской карты}
	expirationDate {срок действия банковской карты}
	cvv {CVV код банковской карты}
	email {адрес электронной почты покупателя}
	phone {номер телефона покупателя}
	firstName {имя}
	lastName {фамилия}
	birthDate {дата рождения}
	citizenship {гражданство}
	documentNumber {серия и № документа}
	documentValidity {срок действия документа}
	gender {пол}
	other {}
}`

const ValidationErrors = ({ $, l, ...props }) => {

	const { forms, formsNodes } = props

	if (!forms || !forms.length) return null

	// UI-text
	const txtValidationErrorsTitle = l('Пожалуйста, проверьте полноту и правильность введенных данных:')

	// process forms
	const isEmptyField = (v, k) => v.isEmpty
	const isInvalidField = (v, k) => v.isValid === false && v.isEmpty === false

	const formsWithEmptyFields = forms.map( form => ({
		type: form.type,
		index: form.index,
		fields: keys(pickBy(form.state, isEmptyField))
	})).filter( form => form.fields.length )

	const formsWithInvalidFields = forms.map( form => ({
		type: form.type,
		index: form.index,
		fields: keys(pickBy(form.state, isInvalidField))
	})).filter( form => form.fields.length )

	const isAllFormsIsValid = !formsWithEmptyFields.length && !formsWithInvalidFields.length
	if (isAllFormsIsValid) return null

	const processFormsFields = (forms) => (
		forms.map( form => {
			return form.fields.map( field => {
				const txtFieldName = l(txtFieldSelector, { field })

				let txtExpandFieldName = ''
				const passIdx = form.index !== undefined ? form.index + 1 : null
				if (passIdx) {
					txtExpandFieldName = l(` {index, select,
						1 {первого}
						2 {второго}
						3 {третьего}
						4 {четвертого}
						5 {пятого}
						6 {шестого}
						other {${passIdx}-го}
					} пассажира`, { index: passIdx })
				}

				return txtFieldName + txtExpandFieldName
			})
		})
	)
	const emptyFieldsNames = flatten(processFormsFields(formsWithEmptyFields))
	const invalidFieldsNames = flatten(processFormsFields(formsWithInvalidFields))

	const getTxtFields = (fieldsNames) => ({
		txtFields: fieldsNames.splice(0, 4).join(', '),
		txtRemainFields: fieldsNames.length
			? l(` и еще ${fieldsNames.length} {fields, plural,
					one {поле}
					two {поля}
					few {поля}
					many {полей}
				}`, { fields: fieldsNames.length })
		: ''
	})

	const txtEmptyFields = emptyFieldsNames.length ? l('Заполните поля: ') : ''
	const txtInvalidFields = invalidFieldsNames.length ? l('Исправьте поля: ') : ''
	const txtEmptyFieldsNames = getTxtFields(emptyFieldsNames)
	const txtInvalidFieldsNames = getTxtFields(invalidFieldsNames)

	let firstFormWithErrors = null
	if (formsWithEmptyFields.length) firstFormWithErrors = formsWithEmptyFields[0].type
	else if (formsWithInvalidFields.length) firstFormWithErrors = formsWithInvalidFields[0].type

	const propsGoToBtn = {
		title: l('Перейти к ошибкам'),
		type: 'errorNoticeRed',
		onClick: () => scrollIntoView(formsNodes[firstFormWithErrors])
	}
	const GoToBtn = () => (
		<div className={$.goToBtnWrapper}>
			<CaButton {...propsGoToBtn}/>
		</div>
	)

	return (
		<div className={$.container}>
			<div className={$.title}>{txtValidationErrorsTitle}</div>
			<div className={$.content}>
				<div>
					{txtEmptyFields}
					{txtEmptyFieldsNames.txtFields}
					{txtEmptyFieldsNames.txtRemainFields}
				</div>
				<div>
					{txtInvalidFields}
					{txtInvalidFieldsNames.txtFields}
					{txtInvalidFieldsNames.txtRemainFields}
				</div>
			</div>
			<div className={$.footer}>
				<GoToBtn/>
			</div>
		</div>
	)
}

export default enhancer(ValidationErrors)
