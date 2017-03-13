import { createEnhancer } from '@utils/decoract'

import style from './style'

import searchIcon from './img/search.svg'

const btnHeight = 60

const enhancer = createEnhancer({
	style: style({ height: btnHeight }),
	withLang: false
})

const SearchBtn = ({ $, ...props }) => {

	const { onClick } = props

	return (
		<button className={$.container} onClick={() => onClick()}>
			<img src={searchIcon} alt='search'/>
		</button>
	)
}

export default enhancer(SearchBtn)

