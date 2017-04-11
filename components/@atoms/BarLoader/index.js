import { createEnhancer } from '@utils/decoract'

import style from './styles/index'

const enhancer = createEnhancer({
	style: style(),
	withLang: false
})

const BarLoader = ({ $ }) => {
	return <div className={$.bar}/>
}

export default enhancer(BarLoader)
