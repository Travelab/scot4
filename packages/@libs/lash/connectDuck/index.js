import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const error = new Error('There must be `ditch` prop')

const mapStateToProps = (state, { ditch }) => {

	if (!ditch) throw error

	return ditch.selector(state)
}

const mapDispatchToProps = (dispatch, { ditch }) => {

	if (!ditch) throw error

	return bindActionCreators(ditch.actions, dispatch)
}

const mergeProps = (state, actions, ownProps) => {

	const { ditch, ...restProps } = ownProps

	if (!ditch) throw error

	// TODO Take care about lang in mergeProps
	return {
		...restProps,
		ditch,
		state,
		actions,
	}
}

export default function connectDuck (duck) {

	return connect(mapStateToProps, mapDispatchToProps, mergeProps)
}