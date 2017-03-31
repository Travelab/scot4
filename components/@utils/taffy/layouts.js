import { find } from 'lodash'

// helper for choosing layout by CQ.
// layoutsByCq - array with 2-elem arrays, that include layout component and CQ (boolean)
// layoutsByCq = [ [ T414_LAYOUT, t414 ], [ F415_LAYOUT, f415 ] ]

export default function (layoutsByCq) {
	const CQ_OFFSET = 1
	const LAYOUT_OFFSET = 0
	const byQueryOn = (layoutByCq) => layoutByCq[CQ_OFFSET]
	return find(layoutsByCq, byQueryOn)[LAYOUT_OFFSET]
}
