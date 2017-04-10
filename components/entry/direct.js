import {render} from 'react-dom'
import {Provider} from 'react-redux'
import checkIntl from '@utils/intlShim'
import {configureStore} from '@libs/lash'

import RootComponent from 'root-component'
import duck from 'duck'
import saga from 'saga'

const ditch = duck.makeDitch()
const store = configureStore(ditch.reducer, ditch.initialState)
if ( saga ) {
  store.runSaga(saga.bind(saga, ditch))
}

const runApp = () => (
  render(
    <Provider store={store}>
      <RootComponent ditch={ditch} />
    </Provider>,
    document.getElementById('root'))
)

checkIntl(runApp)
