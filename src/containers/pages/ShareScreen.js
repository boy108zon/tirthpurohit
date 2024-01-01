import React from 'react';
import { Text, StyleSheet, View, Button, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderComponent from './../../components/HeaderComponent';
import styles from "../../css/share";
export default class ShareScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loading: false,
    }
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <HeaderComponent {...this.props} showName="Share" />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Share Screen......!</Text>
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