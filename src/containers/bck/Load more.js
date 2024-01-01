import React from 'react';
import { Text, StyleSheet, View, Button, Image,ActivityIndicator,SafeAreaView,FlatList,TouchableOpacity } from 'react-native';
import HeaderComponent from './../../components/HeaderComponent';
import { Ionicons } from '@expo/vector-icons';
import styles from "../../css/youraccounts";
export default class YourAccountsScreen extends React.Component {
  constructor(props) {
      super(props);
        this.state = {
          isLoggedIn: false,
		  loading:false,
		   refreshing: true,
		   data: [],
        }
  }	
  componentDidMount() {
        this.fetchCats();
  }
  
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

  fetchCats() {
        this.setState({ refreshing: true });
        fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1')
            .then(res => res.json())
            .then(resJson => {
                this.setState({ data: resJson });
                this.setState({ refreshing: false });
            }).catch(e => console.log(e));
    }
  renderItemComponent(data){
        console.log(data.item.url);
       return (
			<TouchableOpacity style={styles.container}>
				<Text>{data.item.id}</Text>
			</TouchableOpacity>
	   )
  }
    ItemSeparator = () => <View style={{
        height: 2,
        backgroundColor: "rgba(0,0,0,0.5)",
        marginLeft: 10,
        marginRight: 10,
    }}
    />	
   handleRefresh = () => {
        this.setState({ refreshing: false }, () => { this.fetchCats() }); // call fetchCats after setting the state
    }	
  render() {
    return (
      
	  <SafeAreaView style={styles.mainContainer}>
	      <HeaderComponent {...this.props} showName="Your Accounts"/>
          <FlatList
            data={this.state.data}
            renderItem={item => this.renderItemComponent(item)}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this.ItemSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        </SafeAreaView>
    );
  }
}