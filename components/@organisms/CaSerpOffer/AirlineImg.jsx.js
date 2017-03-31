
const AirlineImg = ({ iata, title, width = 28, height = 28, square = true }) => {
	const props = {
		src: `//pics.avs.io/${square ? 'al_square/' : ''}${width}/${height}/${iata}@2x.png`,
		width,
		height,
		alt: title,
		title,
	}

	return <img {...props}/>
}

export default AirlineImg
