import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  DeviceEventEmitter,
  ViewPropTypes,
  Animated,
  Keyboard,
  Platform,
} from 'react-native';
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
import NetInfo from "@react-native-community/netinfo";
import { Actions } from 'react-native-router-flux';
import styles from "../css/login";
import { apiUrl, netErrorMsg, axiosFlashMessageTimeOut, alertInfoMessageTimeOut, axiosHeaders } from "../config/constant";
import storage from '@react-native-async-storage/async-storage';
import FlashMessageComponent from '../components/FlashMessageComponent';
import { ActionSheet } from 'native-base';
const axios = require('axios');
const auth = {
  headers: axiosHeaders
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      forgotEmail: '',
      versionName: 'v1.0.0',
      loading: false,
      isModalVisible: false,
      netStatus: 'none',
      dialogVisible: false,
      errorForgotEmail: "",
      isLoggedIn: false
    }
    this.FlashMessageComponent = React.createRef();
    this._bootstrapAsync = this._bootstrapAsync.bind(this);
  }
  async componentDidMount() {
    NetInfo.fetch().then((connectionInfo) => {
      this.setState({ 'netStatus': connectionInfo.type });
    });
    //NetInfo.addEventListener('connectionChange',this.handleConnectivityChange);
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    try {
      const saved = await storage.getItem('user');
      const isLoggedIn = await storage.getItem('isLoggedIn');
      const storedItem = JSON.parse(saved);
      if (storedItem !== null && isLoggedIn == 1) {
        if (storedItem.userId > 0 && storedItem.userId != "") {
          this.setState({ 'isLoggedIn': true });
          Actions.dashboard({ 'username': storedItem.username, 'usertypename': storedItem.usertypename, 'isLoggedIn': true });
        } else {
          Actions.login();
        }
      }
    } catch (e) {
      console.warn(e);
    }
  };

  handleConnectivityChange = (connectionInfo) => {
    this.setState({ 'netStatus': connectionInfo.type });
  }

  signup = () => {
    if (!this.state.loading) {
      Actions.signup();
    }
  }
  forgotpassword = () => {
    if (!this.state.loading) {
      Actions.forgotpassword();
    }
  }

  emailChange = (text) => {
    this.setState({
      email: text
    });
  }
  passwordChange = (text) => {
    this.setState({
      password: text
    });
  }
  forgotEmailChange = (text) => {
    this.setState({
      forgotEmail: text
    });
  }

  _toggleModal = () => {
    if (!this.state.loading) {
      this.setState({ isModalVisible: !this.state.isModalVisible });
    }
  }

  _toggleModalOkClick = () => {

  }

  doLogin() {
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    if (!this.state.loading) {
      if (this.state.netStatus != "none") {

        this.setState({
          loading: true
        });
        axios.post(apiUrl + 'user/login', user, auth).then(response => {
          //var res_data = response.data;
          if (response.data.status == 1) {
            var userA = {
              userId: response.data.profile.userId,
              username: response.data.profile.username,
              email: response.data.profile.email,
              usertype: response.data.profile.usertype,
              usertypename: response.data.profile.usertypename,
              contactno: response.data.profile.contact_no,
              profile_photo: response.data.profile.profile_photo,
            };
            storage.setItem('user', JSON.stringify(userA));
            storage.setItem('isLoggedIn', JSON.stringify(1));
            this.setState({ 'isLoggedIn': true });
            this.email.setNativeProps({
              text: ''
            })
            this.password.setNativeProps({
              text: ''
            })
            this.setState({
              password: '',
              email: ''
            });
            Actions.dashboard({ 'username': response.data.profile.username, 'usertypename': response.data.profile.usertypename, 'isLoggedIn': true, 'profile_photo': response.data.profile.profile_photo });
          } else if (response.data.status == 0) {
            Alert.alert(
              'Tirth Purohit',
              response.data.msg,
              [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ],
              { cancelable: true }
            )
            this.setState({ loading: false });
          } else {

            Alert.alert(
              'Tirth Purohit',
              'some error occurred, Please try after few minutes.',
              [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ],
              { cancelable: true }
            )
            this.setState({ loading: false });
          }
        }).catch(error => {
          var res_data = error.response;
          if (!res_data.data.status) {
            Alert.alert(
              'Tirth Purohit',
              error.response.data.msg,
              [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ],
              { cancelable: true }
            )
          } else {
            Alert.alert(
              'Tirth Purohit',
              'There is some issue , try later: ' + error.response.status,
              [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ],
              { cancelable: true }
            )
          }
          this.setState({ loading: false });
        });
      } else {
        Alert.alert(
          'Tirth Purohit',
          netErrorMsg, [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed')
          },
        ], {
          cancelable: true
        }
        )
        this.setState({ loading: false });
      }
    }
  }
  render() {

    return (
      <View style={styles.mainContainer}>

        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
          <View style={(styles.row, styles.imageBox, styles.logo)}>
            <Image style={{ width: 190, height: 32 }} source={{ uri: apiUrl + 'assets/images/signin-logo.png' }} />
          </View>

          <View style={{ width: width - 90, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.pageTitle}>Login Here</Text>
          </View>
          <FlashMessageComponent ref={this.FlashMessageComponent} />
          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Email"
            placeholderTextColor="#999999"
            selectionColor="#000"
            keyboardType="email-address"
            onSubmitEditing={() => this.password.focus()}
            onChangeText={this.emailChange}
            ref={(input) => {
              this.email = input
            }}
          />
          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Password"
            secureTextEntry={true}
            selectionColor="#000"
            placeholderTextColor="#999999"
            ref={(input) => this.password = input}
            onChangeText={this.passwordChange}
          />
          <View style={styles.scrollboxActionContainer}>
            <View style={styles.buttonSignup}>
              <TouchableOpacity onPress={
                () => this.doLogin()} >
                <Text style={styles.buttonSignupText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, paddingLeft: 10, }}>
              <TouchableOpacity style={{ alignSelf: 'stretch' }} onPress={this.signup}>
                <Text style={styles.button_1}>Create Account?</Text>
              </TouchableOpacity>
            </View>
            <View style={{ borderLeftWidth: 1, borderLeftColor: 'white' }} />
            <View style={{ flex: 1, paddingRight: 10 }}>
              <TouchableOpacity style={{ alignSelf: 'stretch' }} onPress={this.forgotpassword}>
                <Text style={styles.button_2}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {(this.state.loading &&
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading} />
            </View>
          )}
        </KeyboardAvoidingView>
        <View style={styles.signupTextCont}>
        </View>
      </View>
    );
  }
}

