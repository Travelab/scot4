import {render} from 'react-dom'
import RootComponent from 'root-component'
import checkIntl from '@utils/intlShim'

const runApp = () => (
	render(<RootComponent/>, document.getElementById('root'))
)

checkIntl(runApp)