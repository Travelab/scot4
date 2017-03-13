import { createDuck } from '@libs/lash'

const initialState = {
	activeImageIdx: 0
}

export default createDuck({
	name: 'hotelGallery',
	initialState,
	transformations: {
		changeImage: (state, { payload }) => ({ ...state, activeImageIdx: payload }),
		setActiveImageIdx: (state, value) => ({ ...state, activeImageIdx: value }),
	}
})
