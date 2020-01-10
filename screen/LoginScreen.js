/* eslint-disable no-alert */
import React, {Component} from 'react';
import {View, Text, TextInput, Image, TouchableHighlight} from 'react-native';

import {storeUser} from '../utils/StorageHelper';
import {styles} from '../utils/MainStyles';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', isLoading: false};
  }

  async actionLogin() {
    if (!this.state.email) {
      return alert('Harap isi email');
    }
    if (!this.state.password) {
      return alert('Harap isi password');
    }

    let response, result;

    this.setState(() => ({isLoading: true}));

    try {
      response = await fetch('http://192.168.0.46:8080/login.php', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(this.state),
      });
    } catch (e) {
      alert(e.message);
      this.setState(() => ({isLoading: false}));
      return;
    }

    try {
      result = await response.json();
    } catch (e) {
      alert('error json  -  ' + JSON.stringify(e));
      this.setState(() => ({isLoading: false}));
      return;
    }

    if (result.status === 'login_success') {
      try {
        await storeUser(JSON.stringify(result.user));
        this.props.navigation.replace('Home', {username: result.user.username});
      } catch (e) {
        alert(e.message);
        this.setState(() => ({isLoading: false}));
        return;
      }
    } else {
      alert('Gagal Login');
    }

    this.setState(() => ({isLoading: false}));
  }

  render() {
    if (this.state.isLoading) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Log in</Text>

        <Image
          source={{
            uri:
              'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
          }}
          style={styles.circleImage}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Email"
          autoCompleteType="email"
          keyboardType="email-address"
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          autoCompleteType="password"
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />

        <TouchableHighlight
          style={styles.button}
          onPress={this.actionLogin.bind(this)}
          underlayColor="white">
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
