import env from '@utils/env'

const SRC_OFFSET = 0
const DST_OFFSET = 1
const DEPDATE_OFFSET = 2
const RETDATE_OFFSET = 3
const ADULTS_OFFSET = 4
const CHILDREN_OFFSET = 5
const INFANTS_OFFSET = 6
const TITLE_LOC_OFFSET = 0
const KIND_LOC_OFFSET = 1
const ID_LOC_OFFSET = 2

const mockDate = (days) => {
	let today = new Date()
	today.setDate(today.getDate() + days)
	return today.toISOString().split('T')[0]
}

const defaultPath = `/serp-page/Москва:locality:3064/Сочи:locality:3189/${mockDate(7)}/${mockDate(14)}/1/0/0`

export const getPath = () => (
	decodeURI(env.isDev ?  window.location.hash : window.location.pathname) || defaultPath
)

export const parseUrlPath = (path) => {
	const splittedPath = path.split('/')
	const pathParameters = splittedPath.slice(2) // delete ''/'serp-page'
	const src = pathParameters[SRC_OFFSET].split(':')
	const dst = pathParameters[DST_OFFSET].split(':')

	return {
		searchBar: {
			departureLocation: {
				title: src[TITLE_LOC_OFFSET],
				kind: src[KIND_LOC_OFFSET],
				id: src[ID_LOC_OFFSET]
			},
			destinationLocation: {
				title: dst[TITLE_LOC_OFFSET],
				kind: dst[KIND_LOC_OFFSET],
				id: dst[ID_LOC_OFFSET]
			},
			outboundDate: new Date(pathParameters[DEPDATE_OFFSET]),
			inboundDate: new Date(pathParameters[RETDATE_OFFSET]),
			consist: {
				adults: parseInt(pathParameters[ADULTS_OFFSET]),
				children: parseInt(pathParameters[CHILDREN_OFFSET]),
				infants: parseInt(pathParameters[INFANTS_OFFSET])
			}
		},
		obc: {
			src: pathParameters[SRC_OFFSET],
			dst: pathParameters[DST_OFFSET],
			departDate: pathParameters[DEPDATE_OFFSET],
			returnDate: pathParameters[RETDATE_OFFSET],
			consist: [
				parseInt(pathParameters[ADULTS_OFFSET]),
				parseInt(pathParameters[CHILDREN_OFFSET]),
				parseInt(pathParameters[INFANTS_OFFSET])
			]
		}
	}
}
