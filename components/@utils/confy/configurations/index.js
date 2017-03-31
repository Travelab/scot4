import globalEnv from '../switchers/globalEnv.js'

import API from './api.js'
import CONTACTS from './contacts.js'
import COMMON from './common.js'

export default {
	ENV: globalEnv(),
	API,
	CONTACTS,
	COMMON,
}
