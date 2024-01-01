import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from "./../../css/pageactionpanel";
import { apiUrl, netErrorMsg, axiosHeaders } from "./../../config/constant";
const axios = require('axios');
const auth = {
  headers: axiosHeaders
};
export default class YourAccountLinks extends Component {
  constructor(props) {
    super(props);
  }

  editProfile = () => {
    this.props.navigation.navigate('YourAccounts', { ActionPanelActiveTab: 'EP' });
  }
  editaccountSecuriry = () => {
    this.props.navigation.navigate('AccountSecurity', { ActionPanelActiveTab: 'EAS' });
  }
  editprofilePhoto = () => {
    this.props.navigation.navigate('ProfilePhoto', { ActionPanelActiveTab: 'EPP' });
  }
  render() {
    const { navigation } = this.props;
    const ActiveTabAction = navigation.getParam('ActionPanelActiveTab', 'No-Action-Click');
    return (
      <View style={styles.scrollboxActionContainer}>
        <View style={styles.scrollboxActionContainerInner} >
          <ScrollView
            horizontal={true}
            style={styles.scrollboxHorizontal}
          >
            <View style={{ borderColor: 'grey', flex: 1 }}>
              <TouchableOpacity onPress={() => { this.editProfile(); }}>
                <Text style={[styles.scrollboxActionFirst, (ActiveTabAction === "EP" ? styles.tabActiveText : '')]}><Ionicons name="chevron-forward-outline" size={12} style={styles.arrowicon} /> Edit Profile</Text>
              </TouchableOpacity>
            </View>
            <View style={{ borderColor: 'grey', flex: 1 }}>
              <TouchableOpacity onPress={() => { this.editaccountSecuriry(); }}>
                <Text style={[styles.scrollboxActionText, (ActiveTabAction === "EAS" ? styles.tabActiveText : '')]}><Ionicons name="chevron-forward-outline" size={12} style={styles.arrowicon} /> Account Secutiry</Text>
              </TouchableOpacity>
            </View>
            <View style={{ borderColor: 'grey', flex: 1 }}>
              <TouchableOpacity onPress={() => { this.editprofilePhoto(); }}>
                <Text style={[styles.scrollboxActionText, (ActiveTabAction === "EPP" ? styles.tabActiveText : '')]}><Ionicons name="chevron-forward-outline" size={12} style={styles.arrowicon} /> Profile Photo</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View >
    );
  }
}
