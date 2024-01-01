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
import { ListItem, SearchBar } from 'react-native-elements';
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
      data: [],
      error: null,
    }
    this.FlashMessageComponent = React.createRef();
    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = `https://randomuser.me/api/?&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.results;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
      
    );
  };

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
          <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                  <ListItem
                    leftAvatar={{ source: { uri: item.picture.thumbnail } }}
                    title={`${item.name.first} ${item.name.last}`}
                    subtitle={item.email}
                  />
                )}
                keyExtractor={item => item.email}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
              />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}