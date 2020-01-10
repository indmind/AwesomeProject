/* eslint-disable no-alert */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import {storeUser} from '../utils/StorageHelper';

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
      <View style={{paddingTop: 15, flex: 1, alignItems: 'center'}}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Log in</Text>

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

        <View style={{marginTop: 10}}>
          <Button
            title="Register"
            onPress={() => {
              this.props.navigation.navigate('Register');
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    marginHorizontal: 50,
    marginVertical: 5,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 3,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  button: {
    alignSelf: 'stretch',
    marginHorizontal: 50,
    marginTop: 20,
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 15,
    backgroundColor: '#43cdbb',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  circleImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: '#fff',
    borderWidth: 7,
    marginVertical: 30,
  },
});
