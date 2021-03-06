import React, {Component} from 'react';
import {View, Text, TextInput, Button, TouchableHighlight} from 'react-native';

import {styles} from '../utils/MainStyles';
import {register} from '../utils/Services';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', email: '', password: '', isLoading: false};
  }

  async actionRegister() {
    if (!this.state.username) {
      return alert('Harap isi username');
    }
    if (!this.state.email) {
      return alert('Harap isi email');
    }
    if (!this.state.password) {
      return alert('Harap isi password');
    }

    this.setState(() => ({isLoading: true}));

    let response;

    try {
      response = await register(JSON.stringify(this.state));
    } catch (e) {
      alert(e.message);
      this.setState({isLoading: false});
      return;
    }

    const result = await response.text();

    this.setState({isLoading: false});

    if (result === 'register_success') {
      alert('Berhasil Terdafar, silahkan login');

      this.props.navigation.navigate('Login');
    } else {
      alert('Gagal Register');
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={styles.container}>
        <View style={{width: 200, alignItems: 'stretch', paddingBottom: 30}}>
          <Text style={styles.title}>Create your account</Text>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Your Name"
          autoCompleteType="username"
          onChangeText={username => this.setState({username})}
          value={this.state.username}
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
          onPress={this.actionRegister.bind(this)}
          underlayColor="white">
          <Text style={styles.buttonText}>Join us</Text>
        </TouchableHighlight>

        <View style={{width: 220, marginTop: 30}}>
          <Text style={styles.textMuted}>
            By pressing "Join Us" you agree to our term and & conditions
          </Text>
        </View>
      </View>
    );
  }
}
