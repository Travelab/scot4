import { flow } from 'lodash'

export default function createAction (type, actionMiddleware = []) {

	const middleware = flow(actionMiddleware)

	return (payload, meta) => middleware({ error: payload instanceof Error, meta, payload, type })
}