import { createEnhancer } from '@utils/decoract'

import style from './styles'

const enhancer = createEnhancer({
	style: style(),
	withLang: false
})

const BarLoader = ({ $ }) => (
	<div className={$.bar}/>
)

export default enhancer(BarLoader)
