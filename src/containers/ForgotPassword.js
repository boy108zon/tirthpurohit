import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  AsyncStorage,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  DeviceEventEmitter,
  ViewPropTypes,
  Animated,
  Keyboard,
  Platform,
  Picker,
} from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
import NetInfo from "@react-native-community/netinfo";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import styles from "../css/forgotpassword";
import { apiUrl, netErrorMsg, facebookId, axiosHeaders } from "../config/constant";
import Toast, { DURATION } from 'react-native-easy-toast';
import Modal from 'react-native-modal';
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
const axios = require('axios');
const auth = {
  headers: axiosHeaders
};
export default class ForgotPassword extends Component {
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
      errorForgotEmail: ""
    }

  }
  async componentDidMount() {
    NetInfo.fetch().then((connectionInfo) => {
      this.setState({ 'netStatus': connectionInfo.type })
    });
    //NetInfo.addEventListener('connectionChange',this.handleConnectivityChange);
  }

  handleConnectivityChange = (connectionInfo) => {
    this.setState({ 'netStatus': connectionInfo.type })
  }

  signup = () => {
    if (!this.state.loading) {
      Actions.signup()
    }
  }
  login = () => {
    if (!this.state.loading) {
      Actions.login()
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

  doRecoverPassword() {
    if (!this.state.loading) {
      const user = {
        email: this.state.forgotEmail,
      };
      this.setState({
        loading: true
      });
      axios.post(apiUrl + 'user/forgotpassword', user, auth).then(response => {
        if (response.data.status == 1) {
          Alert.alert(
            'Tirth Purohit',
            response.data.msg,
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          )
          this.setState({ forgotEmail: '' });
          Actions.login();
        } else {
          Alert.alert(
            'Tirth Purohit',
            response.data.msg,
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          )
        }
        this.setState({ loading: false });
      }).catch(error => {
        var res_data = error.response;
        let errorcode = res_data.status ? res_data.status : res_data.data.status;
        Alert.alert(
          'Tirth Purohit',
          "There is some issue , try later:" + errorcode,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: true }
        )
        this.setState({ loading: false });
      });
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
          <Text style={styles.pageTitle}>Forgot Password</Text>
          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Email"
            placeholderTextColor="#999999"
            selectionColor="#000"
            keyboardType="email-address"
            //onSubmitEditing={()=> this.forgotEmail.focus()}
            onChangeText={this.forgotEmailChange}
          />
          <View style={styles.scrollboxActionContainer}>
            <View style={styles.buttonSignup}>
              <TouchableOpacity onPress={
                () => this.doRecoverPassword()} >
                <Text style={styles.buttonSignupText}>Recover your password</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, paddingLeft: 10, }}>
              <TouchableOpacity style={{ alignSelf: 'stretch' }} onPress={this.signup}>
                <Text style={styles.button_1}>Create Account</Text>
              </TouchableOpacity>
            </View>
            <View style={{ borderLeftWidth: 1, borderLeftColor: 'white' }} />
            <View style={{ flex: 1, paddingRight: 10 }}>
              <TouchableOpacity style={{ alignSelf: 'stretch' }} onPress={this.login}>
                <Text style={styles.button_2}>Login?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {(this.state.loading &&
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading} />
            </View>
          )}
        </KeyboardAvoidingView>
        <View style={styles.signupTextCont}></View>
      </View>
    );
  }
}

