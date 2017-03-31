import background from '../images/background.jpg'

export default {

	backWrap: {

 	},
	container: {
		boxSizing: 'border-box',
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'& *': {
			boxSizing: 'border-box'
		},
	},
	wrapper: {
		width: '100%',
		height: '100%',
		backgroundImage: `url(${background})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
	},
	placeholder: {
		minWidth: '100%',
		minHeight: '100%',
		backgroundColor: 'gray',
	},
	header: {
		width: '100%',
	},
	headerWrapper: {
		height: '100%',
		width: '100%',
	},
	headerWrapperMobile: {
		width: '100%',
		position: 'fixed',
		zIndex: 2,
	},
	headerWrapperOpened: {
		extend: 'headerWrapperMobile',
		height: '100%',
		zIndex: 99,
	},
	content: {
		width: '100%',
		maxWidth: 1024,
		padding: {
			top: 0,
			right: '2%',
			bottom: 0,
			left: '2%'
		},
		position: 'relative',
		top: 50,
		margin: {
			top: 0,
			right: 'auto',
			bottom: 0,
			left: 'auto'
		},
	},
	offer: {
		marginBottom: 60,
		padding: {
			top: 10,
			right: 10,
			bottom: 10,
			left: 10
		},
	},
	txtOffer:{
		color: 'white',
		fontSize: 50,
		lineHeight: '75px',
		fontWeight: '200',
		margin: '0',
	},
	infoSlogan: {
		width: '100%',
		display: 'flex',
		marginTop: 60,
	},
	mediumInfoSlogan: {
		extend: 'infoSlogan',
		flexWrap: 'wrap'
	},
	info: {
		height: '100%',
		width: '50%',
	},
	mediumInfo: {
		width: '100%',
		textAlign: 'center',
	},
	infoList: {
		height: '100%',
		width: '100%',
		listStyleType: 'none',
		margin: '0',
		padding: '0',
		fontSize: 40,
		color: 'white'
	},
	txtSlogan: {
		fontSize: 60,
		textAlign: 'right',
		margin: '0',
		color: 'white',
	},
	mediumTxtSlogan: {
		extend: 'txtSlogan',
		textAlign: 'center',
	},
	instructionsBox: {
		width: '90%',
		backgroundColor: 'rgba(0, 1, 19, 0.498039)',
		boxShadow: {
		x: 0, 
		y: 0, 
		blur: 2,
		spread: 5,
		color: 'rgba(0,1,19,.2)',
		inset: 'inset'
	},
	border: '8px solid #ede2d1',
		marginTop: 130,
		marginBottom: 50,
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: {
			top: 20,
			right: 10,
			bottom: 20,
			left: 10
		},
	},
	mediumInstructionsBox: {
		extend: 'instructionsBox',
		marginTop: 50,
	},
	instructions: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-around',
		color: 'white',
		paddingBottom: 5
	},
	mediumInstructions: {
		extend: 'instructions',
		flexWrap: 'wrap'
	},
	instructionsPoint: {
		flexBasis: '33%',
		borderRight: '1px solid rgba(255,255,255,.1)',
		padding: {
			top: 10,
			right: 20,
			bottom: 10,
			left: 20
		},
		'&:last-child': {
			borderRight: 'none',
		}
	},
	mediumInstructionsPoint: {
		extend: 'instructions',
		flexBasis: '100%'
	},
	instTitle: {
		fontSize: 32,
		marginBottom: 25,
		marginTop: '0',
	},
	instText: {
		fontSize: 20,
		margin: '0',
	},
	meanTime: {
		width: '100%',
		borderTop: '1px solid rgba(255,255,255,.1)',
		textAlign: 'center',
		color: 'white',
	},
	meanTimeContent: {
		width: '60%',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 10,
	},
	time: {
		fontSize: 36,
		margin: '0',
	},
	timeText: {
		fontSize: 26,
		margin: '0',
	},
	searchBox: {
		marginTop: '20px',
		boxShadow: '0 4px 20px 0 rgba(0,0,0,.3)',
		background: '#fff'
	},
	footer: {
		width: '100%',
		backgroundColor: '#f2f2f2',
	},
	footerContent: {
		margin: '5px auto 0 auto',
		maxWidth: 400,
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
	}
}
