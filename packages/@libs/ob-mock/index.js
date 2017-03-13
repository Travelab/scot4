import { Query, START_LOADING, DATA_LOADED, DATA_UPDATED } from '@libs/ob'
import mock from '@libs/offer-mock'


export class MockQuery extends Query {
	static make (query) {
		return new MockQuery(query)
	}

	start () {
		this.emit({ type: START_LOADING })

		setTimeout(
			() => {
				this._result = mock({ count: 24 })
				this.emit({ type: DATA_UPDATED })
				this.stopLoading()
			},
			Math.random() * 500
		)
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
