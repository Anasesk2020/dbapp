import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text,Button, View } from 'react-native';
import AppNavigator from './src/navigations/Navigator'
import * as Font from 'expo-font';
import {AppLoading} from 'expo'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
// import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default class App extends React.Component {
  state = {
    isFontLoaded:false
  }
  async componentDidMount(){
    await Font.loadAsync({
      'SemiBold' : require('./src/fonts/Montserrat-SemiBold.otf'),
      'Medium' : require('./src/fonts/Montserrat-Medium.otf'),
      'Regular' : require('./src/fonts/Montserrat-Regular.otf')
    });
    this.setState({isFontLoaded:true})
  }
  render(){
    return (
      (this.state.isFontLoaded === true) ? (<AppNavigator/>):(AppLoading)
    );
  }
 
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
