import React from 'react';
import { Text, StyleSheet, View, Button, Image } from 'react-native';
import HeaderComponent from './../../components/HeaderComponent';
import { Ionicons } from '@expo/vector-icons';
import styles from "../../css/devotees";
import storage from '@react-native-async-storage/async-storage';
export default class DevoteesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loading: false,
    }
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      console.log('secutiry open');
      const result = storage.getItem('isLoggedIn');
      result.then((keyValue) => {
        console.log('secutiry open');
        this.setState({ 'isLoggedIn': keyValue });
      }, (error) => {
        console.log(error)
      });
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }
  async removeItemValue(key) {
    try {
      await storage.removeItem(key);
      return true;
    }
    catch (exception) {
      return false;
    }
  }
  async getItemValue(key) {
    try {
      const result = await storage.getItem(key);
      return result;
    }
    catch (exception) {
      return false;
    }
  }
  getKeyData = async () => {
    try {
      const keys = await storage.getAllKeys();
      const result = await storage.multiGet(keys);
      return result;
    } catch (error) {
      console.error(error)
    }
  }
  handleButton = async () => {
    //let isLoggedIn = await this.getItemValue('isLoggedIn');
    let remkey = await this.removeItemValue('isLoggedIn');
    console.log(remkey);
    //console.log(isLoggedIn);
    //let users = await this.getKeyData();
    //onsole.log(users);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <HeaderComponent {...this.props} showName="Settings" />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Settings ......!</Text>
          <Button onPress={this.handleButton} title='Log storage' />
        </View>
        {(this.state.loading &&
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading} />
          </View>
        )}
      </View>
    );
  }
}