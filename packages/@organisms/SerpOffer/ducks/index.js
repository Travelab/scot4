import { createDuck } from '@libs/lash'

import hotelGalleryDuck from '@molecules/HotelGallery/ducks'

const hotelGallery = hotelGalleryDuck.raiseDuckling()

const initialState = {
	isActive: false
}

export default createDuck({
	name: 'serpOffer',
	initialState,
	ducklings: {
		hotelGallery
	},
	transformations: {
		mouseEnter: (state) => ({ ...state, isActive: true }),
		mouseLeave: (state) => ({ ...state, isActive: false }),
	}
})

