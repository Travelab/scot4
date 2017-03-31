import { Query, START_LOADING, DATA_LOADED, DATA_UPDATED } from '@libs/ob'
import mock from '@libs/offer-mock'

const mockPromise = (channel) => (
	new Promise((resolve) => {
		if (channel === 'clickavia') {
			System.import('@libs/offer-mock/caSampleData').then((sampleData) => {
				resolve(sampleData.default)
			})			
		} 
		else {
			setTimeout(() => {
				resolve(mock({ count: 24 }))
			}, Math.random() * 500)
		}
	})
)

export class MockQuery extends Query {
	static make (query, channel) {
		return new MockQuery(query, channel)
	}

	start () {
		this.emit({ type: START_LOADING })

		mockPromise(this._channel).then((result) => {
			this._result = result
			this.emit({ type: DATA_UPDATED })
			this.stopLoading()
		})
	}

	reset (filter) {
		this.stop()
		this.start()
	}

	stopLoading () {
		setTimeout(() => this.stop(DATA_LOADED), 1000)
	}

	_makeKey (query) {
		return 'test'
	}
}
