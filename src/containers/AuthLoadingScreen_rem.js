import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import storage from "../config/storageconfig";
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loading: false,
      userId: '',
    }
    this._bootstrapAsync = this._bootstrapAsync.bind(this);
  }
  async componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {

    storage.getAllDataForKey('user').then(users => {
      if (Array.isArray(users) || users.length > 0) {
        const first = users[0];
        if (first.userId > 0 && first.userId != "") {
          this.setState({ isLoggedIn: true });
          this.setState({ userId: first.userId });
          this.props.navigation.navigate('AppDashboard');
        } else {
          this.props.navigation.navigate('Auth');
        }
      }
    });
    //console.log("from AuthLoadingScreen "+this.isLoggedIn);
    //console.log('success login1: ' + this.state.isLoggedIn + ' sd ' + this.state.userId);
    //this.props.navigation.navigate(this.isLoggedIn ? 'AppDashboard' : 'Auth');
  };
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}