import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  ActivityIndicator,
  Animated,
  Keyboard,
  Platform,
  ScrollView,
  BackHandler,
  DeviceEventEmitter,
  Button,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NetInfo from "@react-native-community/netinfo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from "../css/signup";
import { apiUrl, netErrorMsg, facebookId, axiosHeaders } from "../config/constant";
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
const axios = require('axios');
const auth = {
  headers: axiosHeaders
};
export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mobile: '',
      email: '',
      password: '',
      cpassword: '',
      usertype: '',
      loading: false,
      netStatus: "none",
      versionName: 'v1.0.0',
    }
  }
  login = () => {
    if (!this.state.loading) {
      Actions.login()
    }
  }

  async componentDidMount() {
    this.CheckConnectivity();
  }
  CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === "android") {
      NetInfo.fetch().then(connectionInfo => {
        const isConnected = connectionInfo.isConnected;
        if (isConnected) {
          this.setState({ 'netStatus': connectionInfo.isConnected })
        } else {
          Alert.alert("You are offline!");
        }
      });
    } else {
      // For iOS devices
      NetInfo.addEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
      );
    }
  };
  handleFirstConnectivityChange = isConnected => {
    NetInfo.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
    if (isConnected === false) {
      Alert.alert("You are offline!");
    } else {
      //Alert.alert("You are online!");
    }
  };

  goBack() {
    Actions.pop();
  }
  usertypeChange = (usertype) => {
    this.setState({ usertype: usertype })
  }
  nameChange = (text) => {
    this.setState({ name: text })
  }
  emailChange = (text) => {
    this.setState({
      email: text
    });
  }
  mobileChange = (text) => {
    this.setState({
      mobile: text
    });
  }
  passwordChange = (text) => {
    this.setState({
      password: text
    });
  }
  cpasswordChange = (text) => {
    this.setState({
      cpassword: text
    });
  }

  signupClick = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let errcnt = 0;
    if (!this.state.loading) {

      if (this.state.netStatus != "none") {
        if (this.state.usertype == "" || this.state.usertype == "0") {
          Alert.alert(
            'Tirth Purohit',
            'Please select who are you?',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: true }
          )
          errcnt++;
          return;
        }
        if (this.state.name == "") {
          Alert.alert(
            'Tirth Purohit',
            'Please write your full name.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: true }
          )
          errcnt++;
          return;
        }
        if (this.state.email == "") {
          Alert.alert(
            'Tirth Purohit',
            'Please enter your email address.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: true }
          )
          errcnt++;
          return;
        }

        if (reg.test(this.state.email) === false) {
          Alert.alert(
            'Tirth Purohit',
            'Please enter valid email address.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: true }
          )
          errcnt++;
          return;
        }

        if (this.state.password == "") {
          Alert.alert(
            'Tirth Purohit',
            'Please enter password.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: true }
          )
          errcnt++;
          return;
        }
        if (this.state.cpassword == "") {
          Alert.alert(
            'Tirth Purohit',
            'Please enter confirm password.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: true }
          )
          errcnt++;
          return;
        }
        if (this.state.password != this.state.cpassword) {
          Alert.alert(
            'Tirth Purohit',
            'Password does not match.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: true }
          )
          errcnt++;
          return;
        }
        if ((this.state.password).length < 6) {
          Alert.alert(
            'Tirth Purohit',
            'The password must be 6 characters long or more.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: true }
          )
          errcnt++;
          return;
        }
        if (errcnt == 0) {
          this.setState({ loading: true });
          this.signInfun();
        }
      }
      else {
        Alert.alert(
          'Tirth Purohit',
          netErrorMsg,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed1') },
          ],
          { cancelable: true }
        )
      }

    }

  }
  signInfun = async () => {
    const user = {
      username: this.state.name,
      password: this.state.password,
      email: this.state.email,
      contact_no: this.state.mobile,
      is_social: "2",
      usertype: this.state.usertype,
      profile_photo: '',
    };

    axios.post(apiUrl + 'user/signup', user, auth).then(response => {
      //$res_data=response.data;
      if (response.data.status == 1) {
        console.log(response.data.profile.userId);

        this.name.setNativeProps({ text: '' })
        this.mobile.setNativeProps({ text: '' })
        this.email.setNativeProps({ text: '' })
        this.password.setNativeProps({ text: '' })
        this.cpassword.setNativeProps({ text: '' })

        this.setState({ name: '' });
        this.setState({ mobile: '' });
        this.setState({ email: '' });
        this.setState({ password: '' });
        this.setState({ cpassword: '' });
        this.setState({ usertype: '' });
        Alert.alert(
          'Tirth Purohit',
          response.data.msg,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: true }
        );
        Actions.login();
      } else if (response.data.status == 0) {
        Alert.alert(
          'Tirth Purohit',
          response.data.msg,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: true }
        )
      } else {

        Alert.alert(
          'Tirth Purohit',
          'some error occurred, Please try after few minutes.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: true }
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

  render() {

    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            keyboardShouldPersistTaps="always"
            scrollEnabled={true}
            behavior="padding"
            enableOnAndroid={true}
            innerRef={ref => { this.scroll = ref }}
          >
            <View style={styles.scrollboxActionContainer}>
              <View style={styles.LogoscrollboxHorizontal}>
                <View style={(styles.logo)}>
                  <Image style={{ width: 190, height: 32 }} source={{ uri: apiUrl + 'assets/images/signin-logo.png' }} />
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.pageTitle}>Sign Up</Text>
                </View>
              </View>
            </View>
            <View style={styles.scrollboxActionContainer}>
              <View style={styles.scrollboxHorizontal}>
                <View>
                  <DropDownPicker
                    items={[
                      { label: 'Shrine Priest / तीर्थ पुरोहित', value: '2' },
                      { label: 'Devotee / यजमान', value: '1' },
                    ]}
                    Value={this.state.usertype}
                    placeholder="Select who are you?"
                    containerStyle={{
                      width: '100%',
                    }}
                    itemStyle={{
                      justifyContent: 'flex-start',
                    }}

                    style={styles.listBox}
                    placeholderStyle={{
                      color: '#999999',
                    }}
                    //dropDownStyle={{ zIndex: 1 }}
                    onChangeItem={(item) => {
                      //this.setState({ inputText: item.value });
                      this.usertypeChange(item.value);
                    }}
                  />
                </View>
                <TextInput style={styles.inputBox}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="Full Name"
                  placeholderTextColor="#999999"
                  selectionColor="#000"
                  ref={(input) => {
                    this.name = input
                  }}
                  onChangeText={this.nameChange} />

                <TextInput style={styles.inputBox}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="Mobile Number"
                  placeholderTextColor="#999999"
                  selectionColor="#000"
                  ref={(input) => {
                    this.mobile = input
                  }}
                  onChangeText={this.mobileChange}
                />

                <TextInput style={styles.inputBox}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="Email"
                  placeholderTextColor="#999999"
                  selectionColor="#000"
                  keyboardType="email-address"
                  ref={(input) => {
                    this.email = input
                  }}
                  onChangeText={this.emailChange}

                />
                <TextInput style={styles.inputBox}
                  selectionColor="#000"
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="Password"
                  secureTextEntry={true}
                  placeholderTextColor="#999999"
                  ref={(input) => {
                    this.password = input
                  }}
                  onChangeText={this.passwordChange}
                />
                <TextInput style={styles.inputBox}
                  selectionColor="#000"
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  placeholderTextColor="#999999"
                  ref={(input) => {
                    this.cpassword = input
                  }}
                  onChangeText={this.cpasswordChange}
                />
              </View>
            </View>
            <View style={styles.scrollboxActionContainer}>
              <View style={styles.buttonSignup}>
                <TouchableOpacity onPress={
                  () => this.signupClick()} >
                  <Text style={styles.buttonSignupText}>Join Now</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={
                () => this.login()} >
                <Text style={styles.buttonLoginText}>Login?</Text>
              </TouchableOpacity>
            </View>
            {(this.state.loading &&
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#0000ff"
                  animating={this.state.loading} />
              </View>
            )}
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    )
  }
}


