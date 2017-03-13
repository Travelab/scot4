import globalEnv from '../switchers/globalEnv.js'

import API from './api.js'
import CONTACTS from './contacts.js'

export default {
	ENV: globalEnv(),
	API,
	CONTACTS,
}
