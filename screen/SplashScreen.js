import React, {Component} from 'react';

import {getUser} from '../utils/StorageHelper';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.authenticateSession();
  }

  authenticateSession() {
    getUser()
      .then(user => {
        if (user !== null) {
          this.props.navigation.replace('Home');
        } else {
          this.props.navigation.replace('Login');
        }
      })
      .catch(() => {});
  }

  render() {
    return null;
  }
}
