
export default {

  backWrap: {
    backgroundImage: 'url(https://travelab.com/public/29d99111df6cb243ba7764e2d3ef6224.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  },
  container: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  placeholder: {
    minWidth: '100%',
    minHeight: '100%',
    backgroundColor: 'gray',
  },
  header: {
    height: 100,
    width: '100%',
  },
  content: {
    width: 1140,
  },
  offer: {
    width: '100%',
    height: 180,
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
    height: 180,
    fontWeight: '200',
    margin: '0',
  },
  infoSlogan: {
    width: '100%',
    height: 164,
    display: 'flex',
    marginTop: 60,
  },
  info: {
    height: '100%',
    width: '50%',
  },
  slogan: {
    height: '100%',
    flexGrow: '1',
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
  instructionsBox: {
    width: '80%',
    height: 300,
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
  instructions: {
    width: '100%',
    height: 180,
    display: 'flex',
    justifyContent: 'space-around',
    color: 'white',
    paddingBottom: 5
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
    height: 107,
    width: '100%',
    borderTop: '1px solid rgba(255,255,255,.1)',
    textAlign: 'center',
    color: 'white',
  },
  meanTimeContent: {
    width: '40%',
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
  finder: {
    width: '100%',
    height: 151,
  },
  footer: {
    height: 60,
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
