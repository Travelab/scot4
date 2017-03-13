export const Loading = (props) => {
	const { action, object } = props

	return (
		<div style={{ color: 'red' }}>
			<h2>{action}</h2>
			<h3>{object}</h3>
		</div>
	)
}

export const ListOfOffers = (props) => {
	const { items, object } = props

	return (
		<div>
			<h3>{object}</h3>
			<ul>
			  {items.map((item, i) => (<li key={item.offer}>{item.hotelData.hotel_name}</li>))}
			</ul>
		</div>
	)
}
