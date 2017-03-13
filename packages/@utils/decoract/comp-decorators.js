import { isEqual } from 'lodash'
import { compose, withProps, mapProps, defaultProps, shouldUpdate, lifecycle, shallowEqual, pure } from 'recompose'

import lang from '@libs/lang'
import { connectDuck } from '@libs/lash'
import { injectSheet } from '@utils/taffy'
import { applyContainerQuery } from 'react-container-query'


const didPropsChange = (prev, next) => (!shallowEqual(prev, next))
const didStateChange = (prev, next) => (prev !== next) // Тестовая функция (должно работать без глубокого сравнения)
//const didStateChange = (prev, next) => (!isEqual(prev, next))
const didLangChange = (prev, next) => (prev.lang !== next.lang) //$$$$

// Закэшированные декораторы
const pureDuckDeco = shouldUpdate((prev, next) => {

	const { state: ps, actions: pa, ditch: pd, ...prevProps } = prev
	const { state: ns, actions: na, ditch: nd, ...nextProps } = next

	return didPropsChange(prevProps, nextProps) || didStateChange(ps, ns)
})

const pureLangDeco = shouldUpdate((prev, next) => {//$$$$

	const { l: pl, actions: a, store: st, ...prevProps } = prev
	const { l: nl, actions: a1, store: st1, ...nextProps } = next

	return didPropsChange(prevProps, nextProps) || didLangChange(pl, nl)
})

const pureDuckWithLangDeco = shouldUpdate((prev, next) => {//$$$$

	const { state: ps, l: pl, actions: a, store: st, ...prevProps } = prev
	const { state: ns, l: nl, actions: a1, store: st1, ...nextProps } = next

	return didPropsChange(prevProps, nextProps) || didStateChange(ps, ns) || didLangChange(pl, nl)
})

const withLangDeco = withProps(() => ({ l: lang }))

const withStyleDeco = mapProps(({ sheet, classes, ...props }) => ({ ...props, $: sheet.classes }))

// Include Staff For Watch Lifecycle Decorator
// Тут нельзя использовать стрелочные функции, потому что this пропадёт ;-(
const isfwlDeco = lifecycle({
	componentWillMount: function () { this.props.actions.componentWillMount() },
	componentWillUnmount: function () { this.props.actions.componentWillUnmount() }
})

// Фабрики декораторов
const injectArgs = (args) => defaultProps({ args })
const injectStyle = (style) => compose(injectSheet(style), withStyleDeco)
const injectCQ = (query) => compose(
	(Container) => applyContainerQuery(Container, query),
	withProps(({ containerQuery }) => ({ cq: containerQuery }))
)

export {
	connectDuck,
	injectStyle,
	injectArgs,
	injectCQ,
	pure as pureDeco,
	pureDuckDeco,
	pureLangDeco,
	pureDuckWithLangDeco,
	withLangDeco,
	isfwlDeco
}
