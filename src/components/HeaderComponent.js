import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { apiUrl } from "../config/constant";
export default class HeaderComponent extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 5,
            left: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            background: 'transparent',
            border: 'none',
            zIndex: 10
          }}
          onPress={() => {
            this.props.navigation.openDrawer();
          }}
        >
          <Image source={{ uri: apiUrl + 'assets/images/menu-rounded.png' }}
            style={{ width: 25, height: 25, marginLeft: -2 }}
          />
        </TouchableOpacity>
        <View style={{ top: 9, alignContent: 'center', alignSelf: 'center' }}>
          <Text
            style={{ color: '#000080', alignContent: 'center', alignSelf: 'center' }}>
            {this.props.showName}
          </Text>
        </View>
      </View>
    );
  }
}
