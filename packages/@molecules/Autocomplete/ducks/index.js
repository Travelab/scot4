import { createDuck } from '@libs/lash'

export const suggestionsStatusValue = {
	NONE: 'suggestions/none',
	REQUEST_LOADING: 'suggestions/requestLoading',
	LOADING: 'suggestions/loading',
	LOADING_SUCCESS: 'suggestions/loadingSuccess',
	LOADING_ERROR: 'suggestions/loadingError'
}

const initialState = {
	inputValue: '',
	rawValue: {},
	hoveredSuggestionIdx: null,
	suggestions: [],
	suggestionsStatus: suggestionsStatusValue.NONE
}

export default createDuck({
	name: 'autocomplete',
	initialState,
	transformations: {
		setValue: (state, { payload }) => ({ ...state, inputValue: payload }),
		setRawValue: (state, { payload }) => ({ ...state, rawValue: payload }),
		setHoveredSuggestionIdx: (state, { payload }) => ({ ...state, hoveredSuggestionIdx: payload}),
		setSuggestions: (state, { payload }) => ({ ...state, suggestions: payload }),
		setSuggestionsStatus: (state, { payload }) => ({ ...state, suggestionsStatus: payload }),
		requestSuggestionsLoading: (state) => ({
			...state,
			hoveredSuggestionIdx: null,
			suggestions: [],
			suggestionsStatus: suggestionsStatusValue.REQUEST_LOADING
		})
	}
})

