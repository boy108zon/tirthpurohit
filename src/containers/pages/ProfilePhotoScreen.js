import React from 'react';
import {
  Text, StyleSheet, View,
  Image, ActivityIndicator, Modal, Alert, Animated,
  FlatList, TouchableOpacity, TouchableHighlight, SafeAreaView, Dimensions, ScrollView
} from 'react-native';
import HeaderComponent from './../../components/HeaderComponent';
import FlashMessageComponent from './../../components/FlashMessageComponent';
import { Ionicons } from '@expo/vector-icons';
import styles from "./../../css/profilephoto";
import { apiUrl, netErrorMsg, axiosFlashMessageTimeOut, alertInfoMessageTimeOut, axiosHeaders } from "./../../config/constant";
import storage from '@react-native-async-storage/async-storage';
import YourAccountLink from './../actionpanel/YourAccountLinks';
import * as ImagePicker from 'expo-image-picker';
//import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
const axios = require('axios');
const auth = {
  headers: axiosHeaders
};
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

export default class ProfilePhotoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loading: false,
      userId: '',
      image: null,
      browseornot: false,
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
    this.getPermissionAsync();
    this._bootstrapAsync();
  }
  componentWillUnmount() {
    this.FlashMessageComponent;
  }
  upldateStoreData() {
    try {
      storage.getItem('user')
        .then(data => {
          data = JSON.parse(data);
          if (data !== null) {
            data.profile_photo = this.state.image.uri;
            storage.setItem('user', JSON.stringify(data));
          }
        }).done();
    } catch (e) {
      console.warn(e);
    }
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
          this.setState({ image: { 'uri': storedItem.profile_photo } });
        } else {
          this.props.navigation.navigate('Auth');
        }
      })
    } catch (e) {
      console.warn(e);
    }
  };

  getPermissionAsync = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }
    /*const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== 'granted') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    }*/
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      //base64: true
    });

    if (result.cancelled) {
      this.setState({ browseornot: false });
      return;
    }
    this.setState({ browseornot: true });
    if (!result.cancelled) {
      this.setState({ 'image': result });

    }
  };

  doSaveProfilePhoto() {
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
      if (this.state.browseornot === false) {
        this.FlashMessageComponent.current.showFlashMeg('Browse your profile photo first then save it.', axiosFlashMessageTimeOut);
        this.setState({ loading: false });
        return;
      }
      let imagedata = this.state.image;
      let localUri = imagedata.uri;
      let filename = localUri.split('/').pop();
      let uriParts = localUri.split('.');
      let fileType = uriParts[uriParts.length - 1];

      let formData = new FormData();
      formData.append('photo', { uri: localUri, type: 'image/jpeg', name: filename, fileType });
      formData.append('userId', this.state.userId);
      //for image change content type
      auth.headers['Content-Type'] = 'multipart/form-data';
      auth.headers['Cache-Control'] = 'no-cache';
      auth.headers['Pragma'] = 'no-cache';
      auth.headers['Expires'] = '0';
      axios.post(apiUrl + 'user/saveprofilephoto', formData, auth).then(response => {
        if (response.data.status == 1) {
          this.FlashMessageComponent.current.showFlashMeg(response.data.msg, axiosFlashMessageTimeOut);
          this.setState({ image: { 'uri': response.data.imageUrlHttp } });
          this.props.screenProps.profile_photo = response.data.imageUrlHttp;
          this.setState({ browseornot: false });
          this.upldateStoreData();
        } else {
          this.FlashMessageComponent.current.showFlashMeg(response.data.msg, axiosFlashMessageTimeOut);
        }
        this.setState({ loading: false });
      }).catch(error => {
        if (error.response.data.status == 1) {
          this.FlashMessageComponent.current.showFlashMeg(error.response.data.msg, axiosFlashMessageTimeOut);
        } else {
          this.FlashMessageComponent.current.showFlashMeg(error.response.data.msg, axiosFlashMessageTimeOut);
        }
        this.setState({ loading: false });
      });
    }
  }

  render() {
    let { image } = this.state;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <HeaderComponent {...this.props} showName="Change Your Profile Photo" />
          <YourAccountLink navigation={this.props.navigation} />
          <View style={styles.scrollboxActionContainer}>
            <View style={styles.scrollboxActionContainerInner} >
              <View style={styles.scrollboxHorizontal}>
                {
                  (this.state.loading &&
                    <View style={styles.loading}>
                      <ActivityIndicator size="large" style={styles.activityIndicatorWrapper} color="#00008B" animating={this.state.loading} />
                    </View>
                  )
                }
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {image &&

                    <Image source={{ uri: image.uri }} style={styles.profileImgContainer} />}
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonBodyImage}>
                    <TouchableOpacity onPress={
                      () => this._pickImage()}>
                      <Text style={styles.buttonTextImage}>Click here to browse...</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonBody}>
                    <TouchableOpacity onPress={
                      () => this.doSaveProfilePhoto()}>
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