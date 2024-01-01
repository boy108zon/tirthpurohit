import React from 'react';
import { Text, StyleSheet, View, Button, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'; 
import { Container, Content, Icon, Header, Body, Form } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../css/dashboard";
import HeaderComponent from './../components/HeaderComponent';
import { Ionicons } from '@expo/vector-icons';

class HomeScreen extends React.Component {
  static navigationOptions = {
        drawerLabel: function(){
			return (
			 <View style={styles.sidebar_hr_bottom}>
			  <Text style={styles.navigation_text}>Home</Text>
			  <Text style={styles.navigation_bagage_text}>Back to home...</Text>
		     </View>
		   )
		},  
        drawerIcon: ({tintColor}) => (
          <Ionicons style={styles.icons} name="home-outline" size={24}></Ionicons>
       ),
  };
  handleButton = () => {
	this.props.navigation.navigate('Details'); 
  } 	
  render() {
    return (
      <View style={styles.mainContainer}>
       <HeaderComponent {...this.props} showName="Home"/>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home Screen......!</Text>
        <Button onPress={this.handleButton} title='Open Details Screen' />
      </View>
      </View>
    );
  }
}

class YourAccountsScreen extends React.Component {
  static navigationOptions = {
        drawerLabel: function(){
			return (
			 <View style={styles.sidebar_hr_bottom}>
			  <Text style={styles.navigation_text}>Your Accounts</Text>
			  <Text style={styles.navigation_bagage_text}>Profile , Password & others...</Text>
		     </View>
		   )
		},  
        drawerIcon: ({tintColor}) => (
          <Ionicons style={styles.icons} name="person-outline" size={24}></Ionicons>
       ),
  };
  handleButton = () => {
	this.props.navigation.navigate('Details'); 
  } 	
  render() {
    return (
      <View style={styles.mainContainer}>
       <HeaderComponent {...this.props} showName="Your Accounts"/>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Your Accounts ......!</Text>
        <Button onPress={this.handleButton} title='Open Details Screen' />
      </View>
      </View>
    );
  }
}

class ShareScreen extends React.Component {
  static navigationOptions = {
        drawerLabel: function(){
			return (
			 <View style={styles.sidebar_hr_bottom}>
			  <Text style={styles.navigation_text}>Share</Text>
			  <Text style={styles.navigation_bagage_text}>Let others know about the app!</Text>
		     </View>
		   )
		},  
        drawerIcon: ({tintColor}) => (
          <Ionicons style={styles.icons} name="share-social-outline" size={24}></Ionicons>
       ),
  };  
  render() {
    return (
       <View style={styles.mainContainer}>
        <HeaderComponent {...this.props} showName="Share" />
       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <Text>Share Screen......!</Text>
       </View>
       </View>
    );
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = {
        drawerLabel: function(){
			return (
			 <View style={styles.sidebar_hr_bottom}>
			  <Text style={styles.navigation_text}>Settings</Text>
			  <Text style={styles.navigation_bagage_text}>Change place & preference..</Text>
		     </View>
		   )
		}, 
        drawerIcon: ({tintColor}) => (
          <Ionicons style={styles.icons} name="settings-outline" size={24}></Ionicons>
       ),
  };   
  render() {
    return (
      <View style={styles.mainContainer}>
        <HeaderComponent {...this.props} showName="Settings" />
       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <Text>Settings ......!</Text>
       </View>
       </View>
    );
  }
}

const CustomDrawerContentComponent = (props) => (
  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
      <View style={(styles.row, styles.imageBox, styles.logo)}> 
		  <Image
			  style={{width:190,height:32}}
			  source={require('../images/signin-logo.png')} />
		 <Text style={{marginLeft:15,alignContent:'center',alignSelf:'center'}}>Rohit Sharma</Text>
       </View>   
      </Body>
    </Header>
    <Content style={{marginTop:-2}}>
      <DrawerItems {...props} />
    </Content>
  </Container>
);

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  YourAccounts: {
    screen: YourAccountsScreen,
  },
  Share: {
    screen: ShareScreen,
  },
  Settings: {
    screen: SettingsScreen,
  } 
},
{
  drawerPosition: 'left',
  drawerType:'front',
  initialRouteName: 'Home',
  drawerBackgroundColor: '#CED0CE',
  drawerWidth: 300,
  contentComponent: CustomDrawerContentComponent,
  contentOptions: {
    activeTintColor: '#2EB6AE',
    inactiveTintColor: '#939393',
  }
});

const RootNavigator = createStackNavigator({
  Home: { 
    screen: MyDrawerNavigator,
	navigationBarStyle : {navBarHidden: true },
	navigationOptions: {
      headerShown: false,
    }
  },
  YourAccounts: { 
    screen: YourAccountsScreen,
	navigationBarStyle : {navBarHidden: true },
	navigationOptions: {
      headerShown: false,
    }
  },
  Share: { 
   screen: ShareScreen,
   navigationBarStyle : {navBarHidden: true },
	navigationOptions: {
      headerShown: false,
    }
  },
  Settings: { 
   screen: SettingsScreen,
   navigationBarStyle : {navBarHidden: true },
	navigationOptions: {
      headerShown: false,
    }
  },
});

const AppContainer = createAppContainer(RootNavigator);
export default class Dashboard extends React.Component {
  render() {
    return <AppContainer />;
  }
}

