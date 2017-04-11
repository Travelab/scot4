import { compose, connectLangWithoutDuck, injectStyle } from '@utils/decoract'

import style from './styles/index'

const enhancer = compose(
	connectLangWithoutDuck(),
	injectStyle(style()),
)

const HotelAvailRooms = ({ l, $, ...props }) => {

	const { roomsCount } = props

	const txtAvailRooms = l(`{roomsCount, plural,
		=0 {Нет свободных номеров}
		one {{roomsCount} свободный номер}
		few {{roomsCount} свободных номера}
		many {{roomsCount} свободных номеров}
	}!`, {
		roomsCount
	})

	return (
		<div className={$.container}>
			{txtAvailRooms}
		</div>
	)
}

export default enhancer(HotelAvailRooms)
