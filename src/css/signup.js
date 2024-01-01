import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native"
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'stretch',
    //justifyContent: 'center',
    height: height,
    //marginTop: StatusBar.currentHeight || 0,
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
  profileBoxTop: {
    backgroundColor: '#000',
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
    marginTop: Platform.OS === 'ios' ? '1%' : '3%',
  },
  flatlisttourchable: {
    justifyContent: 'space-between',
  },
  textInput: {
    width: '100%',
    marginTop: '15%',
    marginBottom: 1,
    borderColor: '#000080',
    borderBottomWidth: 1,
    fontSize: 15,

  },
  dropdownmodelpopup: {
    justifyContent: 'flex-start',
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    fontSize: 16,
  },

  buttonSignup: {
    flex: 2,
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
  buttonLoginText: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 8,
    fontWeight: 'bold',
    color: '#000'
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
  pageTitle: {
    color: '#426bb1',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'flex-end',
  },
  ImageIconStyle: {
    marginTop: 5,
    paddingTop: 10,
    height: 40,
    width: 40,
    borderRadius: 5,
    resizeMode: 'stretch',
  },
  imageBox: {
    flex: 1,
    height: 100,
    backgroundColor: '#333'
  },
  profileBoxBottom: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
    marginTop: Platform.OS === 'ios' ? '1%' : '10%',
  },
  scrollboxActionContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? '5%' : '5%',
    shadowOffset: { width: 2, height: 2 },
  },
  scrollboxActionContainerInner: {
    backgroundColor: '#000'
  },
  scrollboxHorizontal: {
    flex: 2,
    //borderRadius: 10,
    //shadowColor: '#000',
    //shadowOffset: { width: 2, height: 2 },
    //shadowOpacity: 0.4,
    //shadowRadius: 2,
    //elevation: 3,
    backgroundColor: '#FFF',
    color: '#000'
  },
  LogoscrollboxHorizontal: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginTop: '30%'
  },
  inputBox: {
    flexGrow: 0.1,
    width: width - 20,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    fontSize: 16,
    color: '#000000',
    marginVertical: 5,
    paddingHorizontal: 10,
    height: 35,
    borderWidth: 1,
  },
  button_2: {
    alignSelf: 'flex-end',
    color: '#426bb1',
    fontSize: 16,
    fontWeight: '500',

  },
  listBox: {
    flexGrow: 0.1,
    width: width - 20,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    fontSize: 16,
    color: '#000000',
    marginVertical: 5,
    paddingHorizontal: 10,
    borderColor: "#000"
  },
  logo: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
})