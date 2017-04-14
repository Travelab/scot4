/**
 * Created by menscrem on 13.04.17.
 */
import {render} from 'react-dom'
import checkIntl from '@utils/intlShim'

import Root from '../index'

const root = document.getElementById('root')
const runApp = () => {
  render(<Root />, root)
}

checkIntl(runApp)
