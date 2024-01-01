import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import {
	Alert,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	BackHandler
} from 'react-native';

import Login from './containers/Login';
import Signup from './containers/Signup';
import Dashboard from './containers/Dashboard';
import ForgotPassword from './containers/ForgotPassword';
export default class Routes extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Router>
				<Stack key="root" hideNavBar={true}>
					<Scene key="login" component={Login} title="Login" />
					<Scene key="signup" component={Signup} title="Register" />
					<Scene key="forgotpassword" component={ForgotPassword} title="ForgotPassword" />
					<Scene key="dashboard" component={Dashboard} title="Dashboard" />
				</Stack>
			</Router>
		)
	}
}