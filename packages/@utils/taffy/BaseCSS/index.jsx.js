import 'normalize.css'

import { createEnhancer } from '@utils/decoract'

import style from './styles/index.js'

const enhancer = createEnhancer({
	style,
})

const BaseCSS = ({ $, children }) => (<div className={$.base}>{children}</div>)

export default enhancer(BaseCSS)