import React from 'react';
import {
  Text, StyleSheet, View,
  Image, ActivityIndicator, Modal, Alert, Animated,
  FlatList, TouchableOpacity, TouchableHighlight, SafeAreaView, Dimensions, ScrollView
} from 'react-native';
import HeaderComponent from './../../components/HeaderComponent';
import FlashMessageComponent from './../../components/FlashMessageComponent';
import { Ionicons } from '@expo/vector-icons';
import styles from "./../../css/accountsecurity";
import { apiUrl, netErrorMsg, axiosFlashMessageTimeOut, alertInfoMessageTimeOut, axiosHeaders } from "./../../config/constant";
import storage from '@react-native-async-storage/async-storage';
import DevoteesLinks from './../actionpanel/DevoteesLinks';
import { TextInput, Button, Switch } from 'react-native-paper';

const axios = require('axios');
const auth = {
  headers: axiosHeaders
};
export default class ViewDevoteeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loading: false,
      userId: '',
      oldpassword: '',
      newpassword: '',
      confpassword: '',
      showPassword: true,
    }
    this.FlashMessageComponent = React.createRef();
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this._bootstrapAsync = this._bootstrapAsync.bind(this);
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  setOldPassword = (oldpassword) => {
    this.setState({ oldpassword: oldpassword })
  }
  setNewPassword = (newpassword) => {
    this.setState({ newpassword: newpassword })
  }
  setConfirmPassword = (confpassword) => {
    this.setState({ confpassword: confpassword })
  }
  helpBlockText = ({ item }) => (
    <View style={styles.helpBlock}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.bullet}><Ionicons name="arrow-redo" size={10} /></Text>
        <Text style={styles.helpBlockBody}>{item.key}</Text>
      </View>
    </View>
  )

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = () => {
    try {
      const saved = storage.getItem('user');
      const isLoggedIn = storage.getItem('isLoggedIn');
      saved.then((keyvalue) => {
        var storedItem = JSON.parse(keyvalue);
        if (storedItem !== null) {
          this.setState({ 'isLoggedIn': 1 });
          this.setState({ 'userId': storedItem.userId });
        } else {
          this.props.navigation.navigate('Auth');
        }
      })
    } catch (e) {
      console.warn(e);
    }
  };

  doChangePassword() {
    if (!this.state.loading) {
      const user = {
        userId: this.state.userId,
        oldpassword: this.state.oldpassword,
        newpassword: this.state.newpassword,
        confpassword: this.state.confpassword,
      };
      this.setState({
        loading: true
      });

      axios.post(apiUrl + 'user/changepassword', user, auth).then(response => {
        if (response.data.status == 1) {
          this.FlashMessageComponent.current.showFlashMeg(response.data.msg, axiosFlashMessageTimeOut);
          this.oldpassword.setNativeProps({
            text: ''
          });
          this.newpassword.setNativeProps({
            text: ''
          });
          this.confpassword.setNativeProps({
            text: ''
          });
          this.setState({
            oldpassword: '',
            newpassword: '',
            confpassword: ''
          });
          this.oldpassword.clear();
          this.newpassword.clear();
          this.confpassword.clear();
        } else {
          this.FlashMessageComponent.current.showFlashMeg(response.data.msg, axiosFlashMessageTimeOut);
          this.setState({
            oldpassword: '',
            newpassword: '',
            confpassword: ''
          });
        }
        this.setState({ loading: false });
      }).catch(error => {
        var res_data = error.response;
        if (!res_data.data.status) {
          this.FlashMessageComponent.current.showFlashMeg(error.response.data.msg, axiosFlashMessageTimeOut);
        } else {
          this.FlashMessageComponent.current.showFlashMeg('There is some issue , try later: ' + error.response.status, axiosFlashMessageTimeOut);
        }
        this.setState({ loading: false });
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <HeaderComponent {...this.props} showName="View Devotees" />
          <DevoteesLinks navigation={this.props.navigation} />
          <View style={styles.scrollboxActionContainer}>
            <View style={styles.scrollboxActionContainerInner} >

              <View style={styles.scrollboxHorizontal}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.boxheading}>Change Your Password</Text>
                </View>
                {
                  (this.state.loading &&
                    <View style={styles.loading}>
                      <ActivityIndicator size="large" style={styles.activityIndicatorWrapper} color="#00008B" animating={this.state.loading} />
                    </View>
                  )
                }
                <TextInput
                  theme={{ colors: { background: 'white', primary: 'grey', underlineColor: 'transparent' } }}
                  underlineColor="transparent"
                  mode='outlined'
                  label="Enter current password"
                  secureTextEntry={this.state.showPassword}
                  style={styles.textInput}
                  onChangeText={(oldpassword) => this.setOldPassword(oldpassword)}
                  //value={this.setOldPassword(oldpassword)}
                  ref={input => { this.oldpassword = input }}
                />

                <TextInput
                  theme={{ colors: { background: 'white', primary: 'grey', underlineColor: 'transparent' } }}
                  underlineColor="transparent"
                  mode='outlined'
                  label="Enter new password"
                  secureTextEntry={this.state.showPassword}
                  style={styles.textInput}
                  onChangeText={(newpassword) => this.setNewPassword(newpassword)}
                  ref={input => { this.newpassword = input }}
                />
                <TextInput
                  theme={{ colors: { background: 'white', primary: 'grey', underlineColor: 'transparent' } }}
                  underlineColor="transparent"
                  mode='outlined'
                  label="Confirm password"
                  secureTextEntry={this.state.showPassword}
                  style={styles.textInput}
                  onChangeText={(confpassword) => this.setConfirmPassword(confpassword)}
                  ref={input => { this.confpassword = input }}
                />
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                  <Switch
                    trackColor={{ false: "#CED0CE", true: "#808080" }}
                    thumbColor={!this.state.showPassword ? "#808080" : "#CED0CE"}
                    onValueChange={this.toggleSwitch}
                    value={!this.state.showPassword}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonBody}>
                    <TouchableOpacity onPress={
                      () => this.doChangePassword()}>
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <FlashMessageComponent ref={this.FlashMessageComponent} />
        </View>
      </SafeAreaView >
    );
  }
}