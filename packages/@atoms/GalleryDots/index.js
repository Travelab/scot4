import { range } from 'lodash'
import { createEnhancer } from '@utils/decoract'

import style from './styles'

const enhancer = createEnhancer({
	style,
	withLang: false,
})

const GalleryDots = ({ $, ...props }) => {

	const { count, position } = props

	const dots = range(count).map((item) => (
		<div key={item} className={item === position ? $.activeDot : $.dot}/>
	))

	return (
		<div className={$.container}>
			{dots}
		</div>
	)
}

export default enhancer(GalleryDots)
