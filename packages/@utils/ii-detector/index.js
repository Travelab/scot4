// Keeping visual response to under 100ms means your users will not notice the delay
import 'hammer-timejs'

const abilities = {
	USER_CAN_HOVER: false,
	USER_IS_TOUCHING: false,
}

const HOVER_EVENT = 'mouseover'
const TOUCH_EVENT = 'touchstart'

const hoverDetector = () => {
	abilities.USER_CAN_HOVER = true
	window.removeEventListener(HOVER_EVENT, hoverDetector, false)
}

const touchDetector = () => {
	abilities.USER_IS_TOUCHING = true
	window.removeEventListener(TOUCH_EVENT, touchDetector, false)
}

window.addEventListener(HOVER_EVENT, hoverDetector)
window.addEventListener(TOUCH_EVENT, touchDetector)

class InputInterfaceDetector {

	get canHover () {
		return abilities.USER_CAN_HOVER
	}

	get canTouch () {
		return abilities.USER_IS_TOUCHING
	}
}

export default new InputInterfaceDetector