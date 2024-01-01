import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from "./../../css/pageactionpanel";
import { apiUrl, netErrorMsg, axiosHeaders } from "./../../config/constant";
const axios = require('axios');
const auth = {
  headers: axiosHeaders
};
export default class DevoteesLinks extends Component {
  constructor(props) {
    super(props);
  }

  searchDevotees = () => {
    this.props.navigation.navigate('Devotees', { ActionPanelActiveTab: 'SDVTS' });
  }
  viewDevotees = () => {
    this.props.navigation.navigate('ViewDevotees', { ActionPanelActiveTab: 'VDVTS' });
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
              <TouchableOpacity onPress={() => { this.searchDevotees(); }}>
                <Text style={[styles.scrollboxActionText, (ActiveTabAction === "SDVTS" ? styles.tabActiveText : '')]}><Ionicons name="chevron-forward-outline" size={12} style={styles.arrowicon} /> Search Devotees</Text>
              </TouchableOpacity>
            </View>
            <View style={{ borderColor: 'grey', flex: 1 }}>
              <TouchableOpacity onPress={() => { this.viewDevotees(); }}>
                <Text style={[styles.scrollboxActionFirst, (ActiveTabAction === "VDVTS" ? styles.tabActiveText : '')]}><Ionicons name="chevron-forward-outline" size={12} style={styles.arrowicon} /> View Devotee</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View >
    );
  }
}
