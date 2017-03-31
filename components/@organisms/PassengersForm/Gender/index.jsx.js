import { createEnhancer } from '@utils/decoract'

import FormField from '@molecules/FormField'

import style from './style.js'

const enhancer = createEnhancer({
	style,
})

const Gender = ({ $, l, ...props }) => {

	const {
		value,
		isTouched,
		isValid,
		errorMsg,
		radioName,
		t414,
		onBlur,
		onFocus,
		onChange
	} = props

	const label = <div className={!t414 ? $.labelGender : null}>{l('Пол')}</div>

	const propsMale = {
		className: $.radio,
		type: 'radio',
		value: 'male',
		name: radioName,
		checked: value === 'male',
		onChange: (e) => onChange(e.target.value),
		onFocus,
		onBlur
	}
	const propsFemale = {
		className: $.radio,
		type: 'radio',
		value: 'female',
		name: radioName,
		checked: value === 'female',
		onChange: (e) => onChange(e.target.value),
		onFocus,
		onBlur
	}

	return (
		<div className={$.container}>
			<FormField label={label}>
				<div className={t414 ? $.t414RadioWrapper : $.radioWrapper}>
					<label className={$.male}>
						<div>{l('М')}</div>
						<input { ...propsMale } />
						<span className={$.check}></span>
					</label>
					<label className={$.female}>
						<div>{l('Ж')}</div>
						<input { ...propsFemale } />
						<span className={$.check}></span>
					</label>
				</div>
			</FormField>
		</div>
	)
}

export default enhancer(Gender)
