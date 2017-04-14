/**
 * Created by menscrem on 13.04.17.
 */
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import checkIntl from '@utils/intlShim'
import {configureStore} from '@libs/lash'

//import RootComponent from 'root-component'

/*Promise.all([
  System.import('duck'),
  System.import('saga')
])
  .then(([duckImport, sagaImport]) => {
    // TODO: maybe refactor
    const duck = duckImport.default
    const saga = sagaImport.default

    const ditch = duck.makeDitch()
    const store = configureStore(ditch.reducer, ditch.initialState)
    if ( saga ) {
      store.runSaga(saga.bind(saga, ditch))
    }

    const runApp = () => {
      render(
        <Provider store={store}>
          <RootComponent ditch={ditch} />
        </Provider>,
        document.getElementById('root'))
    }

    checkIntl(runApp)
  })
  .catch(() => {
    const runApp = () => {
      render(<RootComponent />, document.getElementById('root'))
    }

    checkIntl(runApp)
  })*/
