import MainContent from './contents/mainContent.jsx.js'
import LoadingOfferContent from './contents/loadingOfferContent.jsx.js'
import FailedOfferContent from './contents/failedOfferContent.jsx.js'
import SuccessPaymentContent from './contents/successPaymentContent.jsx.js'

const contenByType = {
	main: MainContent,
	loadingOffer: LoadingOfferContent,
	failedOffer: FailedOfferContent,
	successPayment: SuccessPaymentContent,
}

const Content = ({ meta, ...props }) => {

	const { type } = props

	const ContentView = contenByType[type]

	return <ContentView meta={meta} {...props}/>
}

export default Content
