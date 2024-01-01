import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
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
  Picker,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
import NetInfo from "@react-native-community/netinfo";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import styles from "../css/login";
import { apiUrl, netErrorMsg, facebookId, apiAccessHeaders } from "../config/constant";
import Toast, { DURATION } from 'react-native-easy-toast';
import Modal from 'react-native-modal';
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
const axios = require('axios');
import storage from "../config/storageconfig";

export default class Login extends Component<{}> {
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
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    //console.log('new fun'+this.state.isLoggedIn);
    this.props.navigation.navigate(this.state.isLoggedIn ? 'AppDashboard' : 'Auth');
  };

  async componentDidMount() {
    NetInfo.fetch().then((connectionInfo) => {
      //console.log(connectionInfo.type);
      this.setState({ 'netStatus': connectionInfo.type });
    });

    //NetInfo.addEventListener('connectionChange',this.handleConnectivityChange);
  }

  handleConnectivityChange = (connectionInfo) => {
    //console.log("connectivity change event.....");
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
        axios({
          method: 'post',
          responseType: 'json',
          url: apiUrl + 'user/login',
          data: user,
        }).then(response => {

          var res_data = response.data;
          if (response.data.status == 1) {
            console.log(res_data);
            var userA = {
              userId: response.data.profile.userId,
              username: response.data.profile.username,
              email: response.data.profile.email,
              usertype: response.data.profile.usertype,
              usertypename: response.data.profile.usertypename,
              contactno: response.data.profile.contact_no
            };
            storage.save({
              key: 'user',
              id: response.data.profile.userId,
              data: userA,
              //autoSync: false,
              expires: null
            });
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
            //console.log('success login: '+this.state.isLoggedIn);
            //Actions.dashboard({'itemDetail':'my check'});
            Actions.dashboard();
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
          this.setState({ loading: false });
          console.log(error);
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
            <Image style={{ width: 190, height: 32 }} source={require('../images/signin-logo.png')} />
          </View>
          <View style={{ width: width - 90, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.pageTitle}>Login Here</Text>
          </View>
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
          <TouchableOpacity style={styles.button} onPress={
            () => this.doLogin()}>
            <Text style={styles.buttonText} >Login</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, paddingLeft: 10, }}>
              <TouchableOpacity style={{ alignSelf: 'stretch' }} onPress={this.signup}>
                <Text style={styles.button_1}>Create Account</Text>
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
        <View style={{ position: 'absolute', right: 15, bottom: 10 }}><Text>{this.state.versionName}</Text></View>
      </View>
    );
  }
}

