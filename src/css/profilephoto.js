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
  profileBoxTop: {
    backgroundColor: '#fff',
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
  faltlistview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height > 950 ? 7 : 10,
    width: 'auto',
    height: height > 950 ? '100%' : 'auto',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 1,
    flex: 1,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  flatlisttext: {
    color: '#000',
    width: '100%',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 14,
    paddingLeft: 10,
  },
  modalView: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    height: '60%',
  },
  modelclosebutton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  modelcloseicon: {

  },
  modalHeader: {
    backgroundColor: "#f1f1f1",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#666",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 1,
    left: 0,
    right: 0,
    position: "absolute",
  },
  modeltitle: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#000"
  },
  textInput: {
    fontSize: 14,
    color: '#000',
    height: 40,
    backgroundColor: 'white',
    paddingLeft: 8,
    paddingRight: 8
  },

  dropdownmodelpopup: {
    justifyContent: 'flex-start',
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    fontSize: 16,
  },

  button: {
    width: '80%',
    height: '30%',
    height: 45,
    //paddingHorizontal: 5,
    //marginRight: 10,
    borderRadius: 5,
    borderWidth: 0.6,
    backgroundColor: '#d9dbd9',
    shadowColor: '#666',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 3,
    borderColor: '#9f9f9f',
    borderWidth: 0,
    alignItems: 'center'
  },
  boxheading: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 12,
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
    justifyContent: 'center',
    zIndex: 9999,
  },
  activityIndicatorWrapper: {
    //backgroundColor: '#b6cbe6',
    height: 75,
    width: 75,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
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
    marginTop: Platform.OS === 'ios' ? '2%' : '5%',

  },
  scrollboxActionContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? '2%' : '3%',
  },
  scrollboxActionContainerInner: {
    height: 300,
    backgroundColor: '#fff'
  },
  scrollboxHorizontal: {
    flex: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
    paddingTop: '10%',
  },
  scrollboxActionText: {
    padding: 15,
    color: '#fff',
    borderRightColor: '#000',
  },
  sidebar_hr_bottom: {
    borderBottomColor: '#CED0CE',
    borderBottomWidth: 1,
    height: 50,
    width: '100%',
  },
  navigation_text: {
    fontSize: 14,
    color: '#000',
    paddingTop: 5
  },
  navigation_bagage_text: {
    fontSize: 12,
    color: 'grey',
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? '4%' : '4%',
    shadowOffset: { width: 2, height: 2 },
  },
  buttonBody: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: '#007bff',
    height: 35
  },
  buttonBodyImage: {
    height: 35
  },
  buttonTextImage: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 8,
    fontWeight: 'bold',
    color: '#000'
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 8,
    fontWeight: 'bold',
    color: '#FFF'
  },
  helpBlock: {
    //backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? '4%' : '4%',
  },
  helpBlockBody: {
    color: 'grey',
  },
  bullet: {
    marginRight: 2
  },
  profileImgContainer: {
    marginLeft: 8,
    height: 82,
    width: 82,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#d9dbd9",
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
})