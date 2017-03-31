import { DuckFactory } from './DuckFactory.js'

export default function createDuck (duckDescription = {}) {

	const duckFactory = new DuckFactory(duckDescription)
	const duck = duckFactory.raiseDuckling()

	return duck
}
