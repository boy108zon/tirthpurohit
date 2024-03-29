import { StyleSheet, Dimensions, Platform } from "react-native"
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
export default StyleSheet.create({
  mainContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    height: height,
  },
  imageBox: {
    flex: 1,
    height: 100,
    backgroundColor: '#333'
  },
  logo: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center',

  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  FacebookStyle: {

    // backgroundColor: '#485a96',
    borderWidth: .5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5,
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',


  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 40,
    width: 40,
    borderRadius: 5,
    resizeMode: 'stretch',

  },
  inputBox: {
    width: width - 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    flexGrow: 0.1,
    borderRadius: 5,
    paddingHorizontal: 16,
    fontSize: 16,
    //fontFamily: 'sansserif',
    color: '#000000',
    marginVertical: 10,
    paddingHorizontal: 16,
    height: 30
  },
  forgotEmail: {
    // width:width-20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#CED0CE',
    flexGrow: 0.1,
    borderRadius: 5,
    paddingHorizontal: 16,
    fontSize: 16,
    //fontFamily: 'sansserif',
    color: '#000000',
    marginVertical: 10,
    paddingHorizontal: 16,
    height: 30
  },
  button: {
    width: width - 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: 5,
  },
  fbbutton: {
    width: 100,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 10
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    // fontFamily: 'sansserifBold',
  },
  signupButton: {
    flexDirection: 'row',
    color: '#426bb1',
    fontSize: 16,
    //fontFamily: 'sansserif',
    fontWeight: '500',
    justifyContent: 'flex-start',
    //paddingRight: '39%',
    backgroundColor: '#007bff'
  },
  forgotPassword: {
    color: '#426bb1',
    fontSize: 16,
    //fontFamily: 'sansserif',
    fontWeight: '500',
    //textAlign:'left',
    //padding:10
    justifyContent: 'flex-end',
    backgroundColor: '#007'
  },
  forCreateContainer: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pageTitle: {
    color: '#426bb1',
    fontSize: 16,
    //fontFamily: 'sansserif',
    fontWeight: 'bold',
    //textAlign:'left',
    //padding:10
    justifyContent: 'flex-end',
  },
  button_1: {
    alignSelf: 'flex-start',
    color: '#000',
    fontSize: 14,
    paddingTop: 5,
    fontWeight: 'bold',
  },
  button_2: {
    alignSelf: 'flex-end',
    color: '#000',
    fontSize: 14,
    paddingTop: 5,
    fontWeight: 'bold',
  },
  buttonSignup: {
    width: width - 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: '#007bff',
    height: 35
  },
  buttonSignupText: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 8,
    fontWeight: 'bold',
    color: '#FFF'
  },
})