import React from 'react';
import { Text, StyleSheet, View, Button, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderComponent from './../../components/HeaderComponent';
import styles from "./../../css/home";
import storage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loading: false,
    }
  }
  navigateToScreen(screenName) {
    this.props.navigation.navigate(screenName);
  }
  _bootstrapAsync = async () => {
    storage.getAllDataForKey('user').then(users => {
      if (!users) {
        this.setState({ 'isLoggedIn': true });
      }
    });
    console.log('home fun' + this.state.isLoggedIn);
    this.props.navigation.navigate(this.state.isLoggedIn ? 'AppDashboard' : 'Auth');
  };
  componentDidMount() {

  }
  handleButton = () => {
    this.props.navigation.navigate('YourAccounts');
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <HeaderComponent {...this.props} showName="Home" />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Home .....!</Text>
          <Button onPress={this.handleButton} title='Open Details ' />

          <View style={{ position: 'absolute', right: 15, bottom: 10 }}><Text>{this.state.isLoggedIn}</Text></View>
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