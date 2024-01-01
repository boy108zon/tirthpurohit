import React from 'react';
import {
  Text, StyleSheet, View,
  Button, Image, ActivityIndicator, TextInput, Modal, Alert, Animated,
  FlatList, TouchableOpacity, TouchableHighlight, SafeAreaView, ImageBackground, Dimensions, ScrollView
} from 'react-native';
import HeaderComponent from './../../components/HeaderComponent';
import { Ionicons } from '@expo/vector-icons';
import styles from "../../css/youraccounts";
import { apiUrl, netErrorMsg, axiosFlashMessageTimeOut, alertInfoMessageTimeOut, axiosHeaders } from "../../config/constant";
import storage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import YourAccountLink from './../actionpanel/YourAccountLinks';
import FlashMessageComponent from './../../components/FlashMessageComponent';
const axios = require('axios');
const auth = {
  headers: axiosHeaders
};
export default class YourAccountsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: 0,
      loading: false,
      data: '',
      isModalVisible: false,
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
    }
    this.FlashMessageComponent = React.createRef();
  }

  handleButton = () => {
    this.props.navigation.navigate('Details');
  }
  setModalVisible = (bool) => {
    this.setState({ isModalVisible: bool })
  }
  setInputText = (text) => {
    this.setState({ inputText: text })
  }
  setEditedItem = (id) => {
    this.setState({ editedItem: id })
  }
  setInputField = (text) => {
    this.setState({ inputField: text })
  }

  showDatePicker = () => {
    this.setState({ setDatePickerVisibility: true });
    this.setState({ isDatePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ setDatePickerVisibility: false });
    this.setState({ isDatePickerVisible: false });
  };

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
              this.setState({ 'data': response.data.eprofile });
              this.setState({ 'gotra_list': response.data.gotra_list });
              this.setState({ 'zodiac_list': response.data.zodiac_list });
              this.setState({ 'userId': storedItem.userId });
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

  renderItem = ({ item }) => (

    <TouchableHighlight onPress={() => {
      if (item.field_name !== 'usertypename' && item.field_name !== 'email' && item.field_name !== 'mobile') {
        this.setModalVisible(true);
        this.setInputText(item.text);
        this.setEditedItem(item.id);
        this.setInputField(item.field_name);
      }
    }}
      underlayColor={'#f1f1f1'} style={styles.flatlisttourchable}>
      <View style={styles.faltlistview}>
        <Text style={styles.flatlisttext}>
          <Ionicons name="create-outline" size={18}></Ionicons>{item.description} : {item.text}
        </Text>
      </View>
    </TouchableHighlight>

  )
  onSaveModelData = (editedItem) => {
    this.handleEditItem(editedItem);
    this.setModalVisible(false);
  }
  handleConfirm = (pickeddate) => {

    let day = pickeddate.getDate();
    let month = pickeddate.getMonth();
    let year = pickeddate.getFullYear();
    let exdate = day + '-' + month + '-' + year
    this.setState({ inputText: exdate })
    this.hideDatePicker();
  };
  handleEditItem = (editedItem) => {
    const newData = this.state.data.map(item => {
      if (item.id === editedItem) {
        if (this.state.inputField == 'gotras') {
          item.text = this.state.selected_grotra_text;
        } else if (this.state.inputField == 'zodiac_sign') {
          item.text = this.state.selected_zodaic_text;
        } else {
          item.text = this.state.inputText;
        }
        return item
      }
      return item
    });

    const newDatasave = {
      id: this.state.userId,
      fieldid: editedItem,
      fieldname: this.state.inputField,
      value: this.state.inputText
    };
    if (editedItem != "" && this.state.inputText != "") {
      axios.post(apiUrl + 'user/editprofile', newDatasave, auth).then(response => {
        if (response.data.status == 1) {
          /*this.setState({
            editedItem: '',
            inputField: '',
            inputText: '',
            selected_grotra_text: '',
            selected_zodaic_text: ''
          });*/
        } else if (response.data.status == 0) {
          this.FlashMessageComponent.current.showFlashMeg(response.data.msg, axiosFlashMessageTimeOut);
          this.setState({ loading: false });
        } else {
          this.setState({ loading: false });
        }

      }).catch(error => {
        this.setState({ loading: false });
      });
    }
  }
  render() {

    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <HeaderComponent {...this.props} showName="Your Accounts" />
          <YourAccountLink navigation={this.props.navigation} />
          <FlashMessageComponent ref={this.FlashMessageComponent} />
          {
            (this.state.loading &&
              <View style={styles.loading}>
                <ActivityIndicator size="large" style={styles.activityIndicatorWrapper} color="#00008B" animating={this.state.loading} />
              </View>
            )
          }

          <FlatList
            data={this.state.data}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            keyExtractor={(item) => item.id.toString()}
            renderItem={this.renderItem}
            style={[styles.profileBoxTop]}
          />

          <Modal transparent={true} animationType="slide" visible={this.state.isModalVisible} onRequestClose={() => this.setModalVisible(false)}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modeltitle}>Change / Save</Text>
                <TouchableOpacity onPress={() => { this.setModalVisible(false) }} style={styles.modelclosebutton}>
                  <Ionicons style={styles.modelcloseicon} color='#5c5f60' name="close-circle-sharp" size={32}></Ionicons>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, width: '100%', top: 30 }}>
                {this.state.inputField == 'gender' ?
                  <DropDownPicker
                    items={[
                      { label: 'Male', value: 'Male' },
                      { label: 'Female', value: 'Female' },
                    ]}
                    Value={this.state.inputText}
                    placeholder="Select Your Gender"
                    containerStyle={{ height: 40, width: '100%', marginTop: '15%' }}
                    style={styles.dropdownmodelpopup}
                    itemStyle={{
                      justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fff' }}
                    onChangeItem={(item) => {
                      this.setState({ inputText: item.value });
                    }}
                  />
                  : this.state.inputField == 'gotras' ?
                    <DropDownPicker
                      items={this.state.gotra_list}
                      placeholder="Select Gotras"
                      containerStyle={{ height: 40, width: '100%', marginTop: '15%' }}
                      style={styles.dropdownmodelpopup}
                      itemStyle={{
                        justifyContent: 'flex-start'
                      }}
                      dropDownStyle={{ backgroundColor: '#fff' }}
                      onChangeItem={(item) => {
                        this.setState({ inputText: item.value });
                        this.setState({ selected_grotra_text: item.label });
                      }}
                    />
                    : this.state.inputField == 'birth_date' ?
                      <TouchableOpacity onPress={this.showDatePicker}>
                        <TextInput
                          style={styles.textInput}
                          placeholder='Select Date of Birth'
                          editable={false}
                          value={this.state.inputText}
                        />
                      </TouchableOpacity>
                      : this.state.inputField == 'zodiac_sign' ?
                        <DropDownPicker
                          items={this.state.zodiac_list}
                          placeholder="Select Your Zodiac Sign"
                          containerStyle={{ height: 40, width: '100%', marginTop: '15%' }}
                          style={styles.dropdownmodelpopup}
                          itemStyle={{
                            justifyContent: 'flex-start'
                          }}
                          dropDownStyle={{ backgroundColor: '#fff' }}
                          onChangeItem={(item) => {
                            this.setState({ inputText: item.value });
                            this.setState({ selected_zodaic_text: item.label });
                          }}
                        />
                        : <TextInput
                          style={styles.textInput}
                          onChangeText={(text) => {
                            this.setState({ inputText: text });
                          }}
                          defaultValue={this.state.inputText}
                          editable={true}
                          multiline={true}
                          maxLength={200}
                        />}
              </View>

              <View style={styles.buttonContainer}>
                <View style={styles.buttonBody}>
                  <TouchableOpacity onPress={
                    () => this.onSaveModelData(this.state.editedItem)} >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <DateTimePickerModal
                  isVisible={this.state.isDatePickerVisible}
                  mode="date"
                  onConfirm={this.handleConfirm}
                  onCancel={this.hideDatePicker}
                  datePickerModeAndroid={'spinner'}
                />
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}