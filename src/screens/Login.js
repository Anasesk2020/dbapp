// Login.js

import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import axios from 'axios';
//import MainContainer from '../../Navigation/MainContainer';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleLogin = () => {
    const { navigate } = this.props.navigation;
    const { email, password } = this.state;

    // Führe eine HTTP-Anfrage an deine serverseitige API zur Authentifizierung durch
    axios
      .post('http://10.0.2.2:3000/login', {
        email: email,
        password: password,
      })
      .then(response => {
        // Verarbeite die Antwort vom Server
        if (response.data.success) {
         navigate('HomeScreen');
        } else {
          alert('Ungültige E-Mail oder Passwort');
        }
      })
      .catch(error => {
        // Behandle Fehler, die während der Anfrage aufgetreten sind
        console.error(error);
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ backgroundColor: '#FFF', height: '100%' }}>
        <Image
          source={require('../images/image.jpg')}
          style={{ width: '100%', height: '43%' }}
        />
        <Text style={{ fontSize: 30, fontFamily: 'SemiBold', alignSelf: 'center' }}>
          Sleep Tracker Application
        </Text>
        <Text
          style={{
            fontFamily: 'SemiBold',
            marginHorizontal: 55,
            textAlign: 'center',
            marginTop: 5,
            opacity: 0.4,
          }}
        >
          Welcome to our app that will help improve your sleep
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 55,
            borderWidth: 2,
            marginTop: 50,
            paddingHorizontal: 10,
            borderColor: '#00716F',
            borderRadius: 23,
            paddingVertical: 2,
          }}
        >
          <Icon name="mail" color="#00716F" size={24} />
          <TextInput
            style={{ paddingHorizontal: 10 }}
            placeholder="E-Mail"
            onChangeText={email => this.setState({ email })}
            autoCapitalize="none"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 55,
            borderWidth: 2,
            marginTop: 15,
            paddingHorizontal: 10,
            borderColor: '#00716F',
            borderRadius: 23,
            paddingVertical: 2,
          }}
        >
          <Icon name="lock" color="#00716F" size={24} />
          <TextInput
            style={{ paddingHorizontal: 10 }}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
        </View>

        <TouchableOpacity
          style={{
            marginHorizontal: 55,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            backgroundColor: '#00716F',
            paddingVertical: 10,
            borderRadius: 23,
          }}
          onPress={this.handleLogin}
        >
          <Text style={{ color: 'white', fontFamily: 'SemiBold' }}>Login</Text>
        </TouchableOpacity>
        <Text
          onPress={() => navigate('Register')}
          style={{
            alignSelf: 'center',
            color: '#00716F',
            fontFamily: 'SemiBold',
            paddingVertical: 30,
          }}
        >
          New User
        </Text>
      </View>
    );
  }
}
