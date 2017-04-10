import path from 'path'
import fs from 'fs'
import {
	entryDirectPath,
	entryStorybullPath,
} from '../../path'
import {ifProd} from './utils'


export default (
	{ 
    rootComponent,
    checkoutStorybook
	} = {}
) => {
  if ( !checkoutStorybook ) {
    return {
      entry: {
        common: entryDirectPath
      },
      resolve: {
        alias: {
          'root-component': rootComponent,
          'duck': path.join(rootComponent, 'ducks') || '',
          'saga': path.join(rootComponent, 'sagas') || ''
        }
      }
    }
  }

  return ifProd({
    entry: {
      bundle: entryDirectPath
    },
    resolve: {
      alias: {
        'root-component': rootComponent
      }
    }
  }, {
    entry: {
      preview: [require.resolve(entryStorybullPath)],
    }
  })
}