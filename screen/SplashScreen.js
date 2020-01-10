import React, {Component} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.authenticateSession();
  }

  authenticateSession() {
    AsyncStorage.getItem('user')
      .then(user => {
        if (user != null) {
          this.props.navigation.replace('Home', {
            username: JSON.parse(user).username,
          });
        } else {
          this.props.navigation.replace('Login');
        }
      })
      .catch(e => {});
  }

  render() {
    return null;
  }
}
