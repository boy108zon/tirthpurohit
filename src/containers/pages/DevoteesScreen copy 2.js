import React from 'react';
import {
  Text, StyleSheet, View,
  Button, Image, ActivityIndicator, TextInput, Modal, Alert, Animated,
  FlatList, TouchableOpacity, TouchableHighlight, SafeAreaView, ImageBackground, Dimensions, ScrollView
} from 'react-native';
import HeaderComponent from './../../components/HeaderComponent';
import { Ionicons } from '@expo/vector-icons';
import styles from "../../css/devotees";
import { apiUrl, netErrorMsg, axiosFlashMessageTimeOut, alertInfoMessageTimeOut, axiosHeaders } from "../../config/constant";
import storage from '@react-native-async-storage/async-storage';
import DevoteesLinks from './../actionpanel/DevoteesLinks';
import FlashMessageComponent from './../../components/FlashMessageComponent';
import TagsInput from 'react-tagsinput'
const axios = require('axios');
const auth = {
  headers: axiosHeaders
};
export default class DevoteesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: 0,
      loading: false,
      data: '',
      inputText: '',
      inputField: '',
      gotra_list: '',
      zodiac_list: '',
      editedItem: 0,
      gender: '',
      userId: '',
      selected_grotra_text: '',
      selected_zodaic_text: '',
      isDatePickerVisible: false,
      setDatePickerVisibility: false,
      scrollY: new Animated.Value(0),
      text: '',
      dataSource:'',
    }
    this.FlashMessageComponent = React.createRef();
    this.arrayholder = [];
  }

  FlatListItemSeparator = () => {
    return (
      <View style={{ height: 1, width: "100%", backgroundColor: "#CED0CE" }} />
    );
  };

  
  componentDidMount() {
    this.setState({ loading: true });
    try {
      const saved = storage.getItem('user');
      saved.then((keyvalue) => {
        var storedItem = JSON.parse(keyvalue);
        if (storedItem !== null) {
          console.log(storedItem);
          console.log(storedItem.userId)
          axios.post(apiUrl + 'user/getprofile', {
            userId: storedItem.userId,
          }, auth).then(response => {
            if (response.data.status == 1) {
              this.setState(
                function() {
                  this.arrayholder = response.data.zodiac_list;
                }
              );
              this.setState({ 'dataSource': response.data.eprofile });
              this.setState({ 'data': response.data.eprofile });
              this.setState({ 'gotra_list': response.data.gotra_list });
              this.setState({ 'zodiac_list': response.data.zodiac_list });
              this.setState({ 'userId': storedItem.userId });
              //this.setState({ films: response.data.gotra_list });
              //this.FlashMessageComponent.current.showFlashMeg(response.data.msg, axiosFlashMessageTimeOut);
            } else if (response.data.status == 0) {
              this.FlashMessageComponent.current.showFlashMeg(response.data.msg, axiosFlashMessageTimeOut);
            } else {
              this.FlashMessageComponent.current.showFlashMeg('some error occurred, Please try after few minutes.', axiosFlashMessageTimeOut);
            }
            this.setState({ loading: false });
          }).catch(error => {
            var res_data = error.response;
            if (res_data !== undefined) {
              if (!res_data.data.status) {
                this.FlashMessageComponent.current.showFlashMeg(error.response.data.msg, axiosFlashMessageTimeOut);
              } else {
                this.FlashMessageComponent.current.showFlashMeg('There is some issue , try later: ' + error.response.status, axiosFlashMessageTimeOut);
              }
            }
            this.setState({ loading: false });
          });
        }
      }, (error) => {
        console.log(error)
      });
    } catch (e) {
      this.setState({ loading: false });
      console.warn(e);
    }
  }

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.text ? item.text.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      text: text,
    });
  }

  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  render() {
    
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <HeaderComponent {...this.props} showName="Search Devotees" />
          <DevoteesLinks navigation={this.props.navigation} />
          <FlashMessageComponent ref={this.FlashMessageComponent} />
          {
            (this.state.loading &&
              <View style={styles.loading}>
                <ActivityIndicator size="large" style={styles.activityIndicatorWrapper} color="#00008B" animating={this.state.loading} />
              </View>
            )
          }
          <View style={styles.scrollboxActionContainer}>
          <View style={styles.viewStyle}>
              <TextInput
                style={styles.textInputStyle}
                onChangeText={text => this.SearchFilterFunction(text)}
                value={this.state.text}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
              />
              <FlatList
                data={this.state.dataSource}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                renderItem={({ item }) => (
                  <Text style={styles.textStyle}>{item.title}</Text>
                )}
                enableEmptySections={true}
                style={{ marginTop: 10 }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}