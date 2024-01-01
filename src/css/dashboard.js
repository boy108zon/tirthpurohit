import { StyleSheet, Dimensions, Platform } from "react-native"
import { color } from "react-native-reanimated";
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
export default StyleSheet.create({
  mainContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'stretch',
    justifyContent: 'center',
    height: height,
  },

  logoImage: {
    width: '70%',
    height: '70%',
    borderRadius: 5
  },
  setting: {
    backgroundColor: '#ffffff',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    left: 0,
    paddingRight: 4,
    paddingTop: 3,
    paddingHorizontal: '0%'
  },
  imageBox: {
    height: 100,
    //backgroundColor: '#333'
  },

  row: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height > 950 ? 7 : 10,
    width: 'auto',
    height: height > 950 ? '100%' : 'auto',
  },
  row2: {
    paddingHorizontal: '1%',
  },
  box_new: {
    flex: height > 950 ? 1 : 2,
    height: '100%',
    width: '100%',
    marginLeft: 4,
    marginRight: 4,
  },
  image: {
    flex: height > 950 ? 1 : 2,
    resizeMode: height > 950 ? 'stretch' : 'cover',

  },
  textView: {
    top: height > 950 ? '80%' : '73%',
    flex: 1,
    bottom: 0,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.1)'

  },
  btnText: {
    color: '#fff', fontSize: Platform.OS === 'ios' ? 17 : 16, padding: '1%', fontFamily: 'sansserif'
  },
  modelRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CED0CE',
  },
  modelLastRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
  },
  modelText: {
    color: '#3779c2',
    fontSize: 17
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
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  drawerHeader: {
    height: 100,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  drawerImage: {
    height: 50,
    width: 50,
    borderRadius: 75
  },
  icon: {
    width: 24,
    height: 24,
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
  profileImgContainer: {
    marginLeft: 5,
    height: 75,
    width: 75,
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