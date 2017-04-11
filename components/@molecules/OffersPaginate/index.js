import obc from '@libs/obc'
import {default as ReactPaginate} from '@libs/react-pagination'
import { isEmpty } from 'lodash'
import { createEnhancer } from '@utils/decoract'

import duck from './ducks/index'
import style from './styles/index'

const enhancer = createEnhancer({
	duck,
	args: {
		paginator: obc.paginator,
	},
	style: style(),
	withLang: true
})

const OffersPaginate = ({ l, $, state, actions, args, ...props }) => {
	const { paginator } = args
	const { isOpened } = state
	const { changePage, toggleBalloon } = actions
	const { twoStepMode } = props

	const totalPages = paginator.totalPages

	if (!totalPages || totalPages < 2) return null

	if (twoStepMode) {
		const currentPage = paginator.currentPage + 1
		const txtPointer = l(`{page} страница из {total}`, {
			page: currentPage,
			total: totalPages
		})
		const onChangePage = (page) => {
			if (page < 0 || page > totalPages - 1) return null
			changePage({ selected: page })
		}
		const prev = () => onChangePage(currentPage - 2)
		const next = () => onChangePage(currentPage)

		const renderBaloon = () => (
			<div className={$.pagesPad}>
				<div className={$.pages}>
					<div className={currentPage === 1 ? $.disabledPage : $.page} onClick={prev}>
						{currentPage > 1 && currentPage - 1}
					</div>
					<div className={$.page}>{currentPage}</div>
					<div className={currentPage === totalPages ? $.disabledPage : $.page} onClick={next}>
						{currentPage < totalPages && currentPage + 1}
					</div>
				</div>
			</div>
		)

		return (
			<div className={$.mobileContainer}>
				{isOpened && renderBaloon()}
				<div className={$.pointer} onClick={() => toggleBalloon()}>{txtPointer}</div>
			</div>
		)
	}
	else {
		const txtPrev = l('пред')
		const txtNext = l('след')

		const propsReactPaginate = {
			previousLabel: txtPrev,
			nextLabel: txtNext,
			breakLabel: (<a>...</a>),
			breakClassName: $.break,
			initialPage: paginator.currentPage,
			pageCount: totalPages,
			marginPagesDisplayed: 2,
			pageRangeDisplayed: 5,
			onPageChange: changePage,
			containerClassName: $.pagination,
			subContainerClassName: "pages pagination",
			activeClassName: $.active
		}

		return (
			<div className={$.container}>
				<ReactPaginate {...propsReactPaginate}/>
			</div>
		)
	}
}

export default enhancer(OffersPaginate)
