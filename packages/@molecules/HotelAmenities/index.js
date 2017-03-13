import { map, pick, isEmpty } from 'lodash'
import { compose, connectLangWithoutDuck, injectStyle } from '@utils/decoract'

import style from './styles'

import swimmingPool from './images/swimmingPool.svg'
import sandyBeach from './images/sandyBeach.svg'
import childrensPlayground from './images/childrensPlayground.svg'
import playroom from './images/playroom.svg'
import childrenSwimmingPool from './images/childrenSwimmingPool.svg'
import waterPark from './images/waterPark.svg'
import spa from './images/spa.svg'
import freeParking from './images/freeParking.svg'
import airConditioning from './images/airConditioning.svg'
import freeWifi from './images/freeWifi.svg'

const enhancer = compose(
	connectLangWithoutDuck(),
	injectStyle(style),
)

const HotelAmenities = ({ l, $, ...props }) => {

	const { amenities } = props

	const amenitiesDescriptions = {
		1 : { title: l('Бассейн'), key: 'swimmingPool' },
		11: { title: l('Песчаный пляж'), key: 'sandyBeach'},
		16: { title: l('Детская площадка'), key: 'childrensPlayground' },
		17: { title: l('Игровая комната'), key: 'playroom' },
		19: { title: l('Детский бассейн'), key: 'childrenSwimmingPool' },
		20: { title: l('Аквапарк'), key: 'waterPark' },
		53: { title: l('Спа-центр'), key: 'spa' },
		80: { title: l('Парковка'), key: 'freeParking' },
		88: { title: l('Кондиционер'), key: 'airConditioning' },
		94: { title: l('Wi-Fi'), key: 'freeWifi' },
	}

	const amenitiesIcons = {
		swimmingPool,
		sandyBeach,
		childrensPlayground,
		playroom,
		childrenSwimmingPool,
		waterPark,
		spa,
		freeParking,
		airConditioning,
		freeWifi
	}

	const availableAmenities = pick(amenitiesDescriptions, amenities)

	if (isEmpty(availableAmenities)) return null

	const icons = map(
		availableAmenities,
		({ title, key }) => <img src={amenitiesIcons[key]} key={key} title={title}/>
	)

	return (
		<div className={$.amenities}>
			{icons}
		</div>
	)
}

export default enhancer(HotelAmenities)
