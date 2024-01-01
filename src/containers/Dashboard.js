import React from 'react';
import {
  Text, StyleSheet, View,
  Button, Image,
  TouchableOpacity, ActivityIndicator,
  TouchableHighlight, Dimensions, TextInput, Alert, ScrollView
} from 'react-native';
import storage from '@react-native-async-storage/async-storage';
import styles from "../css/dashboard";
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { apiUrl, netErrorMsg, axiosHeaders } from "../config/constant";
import { Actions } from 'react-native-router-flux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Container, Content, Icon, Header, Body, Form } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from "./pages/HomeScreen";
import ShareScreen from "./pages/ShareScreen";
import LoginScreen from "./Login";
import YourAccountsScreen from "./pages/YourAccountsScreen";
import AccountSecurityScreen from './pages/AccountSecurityScreen';
import ProfilePhotoScreen from './pages/ProfilePhotoScreen';
import DevoteesScreen from "./pages/DevoteesScreen";
import ViewDevoteeScreen from './pages/ViewDevoteeScreen';
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo- constants).",
]);
//LogBox.ignoreAllLogs();

const CustomDrawerContentComponent = (props) => {
  return (
    <Container>
      <Header style={styles.drawerHeader}>
        <Body>
          <View style={styles.drawerHeader}>
            <View style={styles.logo, { flex: 2, paddingTop: '5%' }}>
              <Image
                style={{ width: 190, height: 32 }}
                source={{ uri: apiUrl + 'assets/images/signin-logo.png' }} />
              <Text style={{ alignContent: 'center', alignSelf: 'center' }}>Welcome {props.screenProps.username}</Text>
              <Text style={{ alignContent: 'center', alignSelf: 'center' }}> {props.screenProps.usertypename}</Text>
            </View>
            <View style={{ flex: 1, paddingTop: '5%' }}>
              <TouchableOpacity onPress={() => props.navigation.navigate('ProfilePhoto', { ActionPanelActiveTab: 'EPP' })} style={styles.signoutContainer}>
                <Image style={styles.profileImgContainer} source={{ uri: props.screenProps.profile_photo }} />
              </TouchableOpacity>
            </View>
          </View>
        </Body>
      </Header>
      <Content style={{ marginTop: -2 }}>
        <ScrollView>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <TouchableOpacity onPress={() =>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  { text: 'Cancel', onPress: () => { return null } },
                  {
                    text: 'Confirm', onPress: () => {
                      storage.removeItem('user');
                      storage.removeItem('isLoggedIn');
                      Actions.login();
                    }
                  },
                ],
                { cancelable: false }
              )
            }>
              <Text style={{ margin: 16, fontWeight: 'bold', color: 'red', 'paddingLeft': '15%' }}>
                Logout
		        </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </Content>
    </Container>
  )
};

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => {
      return {
        //drawerLabel: () => null,
        //drawerIcon: () => null,
        drawerLabel: function () {
          return (
            <View style={styles.sidebar_hr_bottom}>
              <Text style={styles.navigation_text}>Home</Text>
              <Text style={styles.navigation_bagage_text}>Back to home...</Text>
            </View>
          )
        },
        drawerIcon: ({ tintColor }) => (
          <Ionicons style={styles.icons} name="home-outline" size={24}></Ionicons>
        ),
      }
    }
  },
  YourAccounts: {
    screen: YourAccountsScreen,
    //screen: (props) => <YourAccountsScreen {...props} ActionPanelActiveTab='EP' />,
    navigationOptions: ({ navigation }) => {
      return {
        //drawerLabel: () => null,
        drawerLabel: function () {
          return (
            <View style={styles.sidebar_hr_bottom}>
              <Text style={styles.navigation_text}>Your Accounts</Text>
              <Text style={styles.navigation_bagage_text}>Profile , Password & others...</Text>
            </View>
          )
        },
        drawerIcon: ({ tintColor }) => (
          <Ionicons style={styles.icons} name="person" size={24}></Ionicons>
        ),
      }
    }
  },
  Devotees: {
    screen: DevoteesScreen,
    navigationOptions: ({ navigation }) => {
      return {
        //drawerLabel: () => null,
        drawerLabel: function () {
          return (
            <View style={styles.sidebar_hr_bottom}>
              <Text style={styles.navigation_text}>Devotees (यजमान)</Text>
              <Text style={styles.navigation_bagage_text}>Search , Add Your Devotees & others...</Text>
            </View>
          )
        },
        drawerIcon: ({ tintColor }) => (
          <Ionicons style={styles.icons} name="person-add" size={24}></Ionicons>
        ),
      }
    }
  },
  ViewDevotees: {
    screen: ViewDevoteeScreen,
    //screen: (props) => <ProfilePhotoScreen {...props} />,
    navigationOptions: ({ navigation }) => {
      return {
        drawerLabel: () => null,
        drawerIcon: () => null,
      }
    }
  },
  Share: {
    screen: ShareScreen,
    navigationOptions: ({ navigation }) => {
      return {
        //drawerLabel: () => null,
        drawerLabel: function () {
          return (
            <View style={styles.sidebar_hr_bottom}>
              <Text style={styles.navigation_text}>Share</Text>
              <Text style={styles.navigation_bagage_text}>Let others know about the app!</Text>
            </View>
          )
        },
        drawerIcon: ({ tintColor }) => (
          <Ionicons style={styles.icons} name="share-social-outline" size={24}></Ionicons>
        ),
      }
    }
  },
  AccountSecurity: {
    screen: AccountSecurityScreen,
    //screen: (props) => <AccountSecurityScreen {...props} ActionPanelActiveTab='EAS' />,
    navigationOptions: ({ navigation }) => {
      return {
        drawerLabel: () => null,
        drawerIcon: () => null,
      }
    }
  },
  ProfilePhoto: {
    screen: ProfilePhotoScreen,
    //screen: (props) => <ProfilePhotoScreen {...props} />,
    navigationOptions: ({ navigation }) => {
      return {
        drawerLabel: () => null,
        drawerIcon: () => null,
      }
    }
  }
},
  {
    drawerPosition: 'left',
    drawerType: 'front',
    initialRouteName: 'Home',
    drawerBackgroundColor: '#FFF',
    drawerWidth: 300,
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: '#2EB6AE',
      inactiveTintColor: '#939393',
    }
  });

const AppStack = createStackNavigator({
  Home: {
    screen: MyDrawerNavigator,
    navigationBarStyle: { navBarHidden: true },
    navigationOptions: {
      headerShown: false,
      headerTransparent: true
    }
  },
  YourAccounts: {
    screen: MyDrawerNavigator,
    navigationBarStyle: { navBarHidden: true },
    navigationOptions: {
      headerShown: false,
    }
  },
  Share: {
    screen: MyDrawerNavigator,
    navigationBarStyle: { navBarHidden: true },
    navigationOptions: {
      headerShown: false,
    }
  },
  Devotees: {
    screen: MyDrawerNavigator,
    navigationBarStyle: { navBarHidden: true },
    navigationOptions: {
      headerShown: false,
    }
  },
  AccountSecurity: {
    screen: MyDrawerNavigator,
    navigationBarStyle: { navBarHidden: true },
    navigationOptions: {
      headerShown: false,
    }
  },
  ProfilePhoto: {
    screen: MyDrawerNavigator,
    navigationBarStyle: { navBarHidden: true },
    navigationOptions: {
      headerShown: false,
    }
  },
});
const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationBarStyle: { navBarHidden: true },
    navigationOptions: {
      headerShown: false,
    }
  },
});

const AppNavigator = createSwitchNavigator(
  {
    AppDashboard: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AppDashboard',
  },
);

const AppContainer = createAppContainer(AppNavigator);
export default class Dashboard extends React.Component {
  render() {
    return (
      this.props.isLoggedIn ? <AppContainer screenProps={{ username: this.props.username, usertypename: this.props.usertypename, isLoggedIn: this.props.isLoggedIn, profile_photo: this.props.profile_photo }} /> : <LoginScreen />
    );
  }
}

