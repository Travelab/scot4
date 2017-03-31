import { sortBy, values, filter, findKey } from 'lodash'
import documentTypes from './documentTypes.js'

export default {
	initialState: {
		value: 'Национальный паспорт',
		code: findKey(documentTypes, (value) => value === 'Национальный паспорт'),
		types: values(documentTypes),
		hoveredIdx: null,
		isActivated: false,
		isTouched: false
	},
	transformations: {
		activateDocType: (state) => ({
			...state,
			documentType: {
				...state.documentType,
				isActivated: true,
				isTouched: false
			}
		}),
		deactivateDocType: (state) => ({
			...state,
			documentType: {
				...state.documentType,
				isActivated: false,
				isTouched: true
			}
		}),
		setDocTypeValue: (state, { payload }) => ({
			...state,
			documentType: {
				...state.documentType,
				value: payload
			}
		}),
		setDocTypeCode: (state, { payload }) => ({
			...state,
			documentType: {
				...state.documentType,
				code: findKey(documentTypes, (value) => value === payload) || null
			}
		}),
		setDocTypeHoveredIdx: (state, { payload }) => ({
			...state,
			documentType: {
				...state.documentType,
				hoveredIdx: payload
			}
		}),
	}
}
