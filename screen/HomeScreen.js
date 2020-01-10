import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';

import {getUser, removeUser} from '../utils/StorageHelper';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {user: null};

    getUser().then(user => this.setState({user}));
  }

  render() {
    if (this.state.user === null) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }

    return (
      <View style={{padding: 6}}>
        <Text>Hallo {this.state.user.username}</Text>

        <View style={{marginTop: 10}}>
          <Button
            onPress={async () => {
              await removeUser();

              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Login'})],
              });

              this.props.navigation.dispatch(resetAction);
            }}
            title="Logout"
          />
        </View>
      </View>
    );
  }
}
