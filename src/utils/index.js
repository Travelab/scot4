

const shared = {}

export function setShared (key, val) {

	shared[key] = val
}

export function getShared (key) {

	return shared[key]
}