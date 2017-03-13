import { createEnhancer } from '@utils/decoract'

import style from './styles/segment.js'

export default createEnhancer({ style })(({ $, l, t414, meta, data }) => {

	const txtDepart = l('Вылет')
	const txtArrive = l('Прибытие')
	const txtBaggage = l('Багаж')
	const txtBaggageNone = l('Багаж не входит в стоимость')
	const txtT414BaggageNone = l('Без багажа')
	const txtBaggageOnlyUnchecked = l('Только ручная кладь')
	const txtBaggageAmount = (count, type) => {

		return l(`
			{count, plural,
				=1 {Одно место}
				one {# место}
				few {# места}
				many {# мест}
			} {type, select,
				unchecked {ручной клади}
				checked {багажа}
				other {}
			}
		`, {
			count,
			type
		})
	}
	const txtBaggageWeight = (baggage) => {

		const uniqItems = []
		const countUniqItems = {}

		baggage.forEach((weight) => {
			if (countUniqItems[weight]) countUniqItems[weight]++
			else {
				uniqItems.push(weight)
				countUniqItems[weight] = 1
			}
		})

		return uniqItems
			.map((weight) => {

				let str = l('до {weight, number} кг', { weight })
				const count = countUniqItems[weight]

				if (count > 1) str += ` × ${count}`

				return str
			})
			.join(' + ')
	}

	const renderT414Baggage = () => {
		const { checked, unchecked } = data.baggage

		const checkedCount = checked.length
		const uncheckedCount = unchecked.length

		if (!checkedCount && !uncheckedCount) return (
			<div className={$.straight}>
				<div className={$.caption}>{txtT414BaggageNone}</div>
			</div>
		)

		if (!checkedCount && uncheckedCount) return (
			<div className={$.straight}>
				<div className={$.caption}>{txtBaggageOnlyUnchecked}</div>
			</div>
		)

		const sumWeight = checked.reduce((acc, weight) => acc + weight, 0)
		const txtBaggageSumWeight = l('{sumWeight, number} кг багажа', { sumWeight })

		return (
			<div className={$.straight}>
				<div className={$.caption}>{txtBaggageSumWeight}</div>
			</div>
		)
	}

	const renderPlace = (what) => {

		let { name, city } = data[what].airport
		const airportColor = meta.bySections[what].airportColor

		if (name === city) city = undefined

		if (name && airportColor) name = <span style={{ color: airportColor }}>{name}</span>

		return name && city
			? <span>{city}, {name}</span>
			: <span>{city || name}</span>
	}

	const renderAirport = (direction) => {
		let { name } = data[direction].airport
		const airportColor = meta.bySections[direction].airportColor
		if (name && airportColor) name = <span style={{ color: airportColor }}>{name}</span>

		return <span>{name}</span>
	}

	const renderBaggage = () => {

		const { checked, unchecked } = data.baggage
		const checkedCount = checked.length
		const uncheckedCount = unchecked.length

		if (!checkedCount && !uncheckedCount) return (
			<div className={$.straight}>
				<div className={$.caption}>{txtBaggageNone}</div>
			</div>
		)

		if (!checkedCount && uncheckedCount) return (
			<div>
				<div className={$.straight}>
					<div className={$.caption}>{txtBaggageOnlyUnchecked}</div>
				</div>
				<div className={$.divided}>
					<div className={$.caption}>{txtBaggageAmount(uncheckedCount)}</div>
					<div className={$.label}>{txtBaggageWeight(unchecked)}</div>
				</div>
			</div>
		)

		return (
			<div>
				{!!uncheckedCount && <div className={$.divided}>
					<div className={$.caption}>{txtBaggageAmount(uncheckedCount, 'unchecked')}</div>
					<div className={$.label}>{txtBaggageWeight(unchecked)}</div>
				</div>}
				{!!checkedCount && <div className={$.divided}>
					<div className={$.caption}>{txtBaggageAmount(checkedCount, 'checked')}</div>
					<div className={$.label}>{txtBaggageWeight(checked)}</div>
				</div>}
			</div>
		)
	}

	const propsAirlineImg = {
		src: `//pics.avs.io/99/36/${data.airline.code}@2x.png`,
		width: 99,
		height: 36,
		alt: data.airline.name
	}

	const renderF414Layout = () => (
		<div className={$.container}>
			<div className={$.half}>
				<div className={$.depart}>
					<div className={$.straight}>
						<div className={$.label}>
							{txtDepart} · {data.flightId}
						</div>
					</div>
					<div className={$.divided}>
						<div className={$.time} style={{ color: meta.bySections.depart.timeColor}}>
							{data.depart.time}
						</div>
						{!meta.bySections.depart.hideDate && <div className={$.label}>{data.depart.date}</div>}
					</div>
					<div className={$.divided}>
						<div className={$.caption}>{renderPlace('depart')}</div>
						<div className={$.label}>{data.depart.airport.code}</div>
					</div>
				</div>
				<div className={$.arrive}>
					<div className={$.straight}>
						<div className={$.label}>{txtArrive}</div>
					</div>
					<div className={$.divided}>
						<div className={$.time} style={{ color: meta.bySections.arrive.timeColor}}>
							{data.arrive.time}
						</div>
						{!meta.bySections.arrive.hideDate && <div className={$.label}>{data.arrive.date}</div>}
					</div>
					<div className={$.divided}>
						<div className={$.caption}>{renderPlace('arrive')}</div>
						<div className={$.label}>{data.arrive.airport.code}</div>
					</div>
				</div>
			</div>
			<div className={$.half}>
				<div className={$.flight}>
					<div className={$.straight}>
						<img {...propsAirlineImg}/>
					</div>
					<div className={$.straight}>
						<div className={$.caption}>{data.duration}</div>
					</div>
					<div className={$.straight}>
						<div className={$.caption}>{data.aircraft}</div>
					</div>
				</div>
				<div className={$.service}>
					<div className={$.straight}>
						<div className={$.label}>{txtBaggage}</div>
					</div>
					{renderBaggage()}
				</div>
			</div>
		</div>
	)

	const renderT414Layout = () => (
		<div className={$.t414Container}>
			<div className={$.row}>
				<div className={$.t414Depart}>
					<div className={$.straight}>
						<div className={$.label}>
							{txtDepart} · {data.flightId}
						</div>
					</div>
					<div className={$.divided}>
						<div className={$.time} style={{ color: meta.bySections.depart.timeColor}}>
							{data.depart.time}
						</div>
						{!meta.bySections.depart.hideDate && <div className={$.label}>{data.depart.date}</div>}
					</div>
					<div className={$.divided}>
						<div className={$.caption}>{renderAirport('depart')}</div>
						<div className={$.label}>{data.depart.airport.code}</div>
					</div>
				</div>
				<div className={$.t414Arrive}>
					<div className={$.straight}>
						<div className={$.label}>{txtArrive}</div>
					</div>
					<div className={$.divided}>
						<div className={$.time} style={{ color: meta.bySections.arrive.timeColor}}>
							{data.arrive.time}
						</div>
						{!meta.bySections.arrive.hideDate && <div className={$.label}>{data.arrive.date}</div>}
					</div>
					<div className={$.divided}>
						<div className={$.caption}>{renderAirport('arrive')}</div>
						<div className={$.label}>{data.arrive.airport.code}</div>
					</div>
				</div>
			</div>
			<div className={$.row}>
				<div className={$.t414AirlineLogo}>
					<img {...propsAirlineImg}/>
				</div>
				<div className={$.t414FlightDuration}>
					<div className={$.caption}>{data.duration}</div>
				</div>
			</div>
			<div className={$.row}>
				<div className={$.t414BaggageInfo}>
					{renderT414Baggage()}
				</div>
				<div className={$.t414FlightNumber}>
					<div className={$.caption}>{data.aircraft}</div>
				</div>
			</div>
		</div>
	)

	return t414 ? renderT414Layout() : renderF414Layout()
})
