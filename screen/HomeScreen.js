import React, {Component} from 'react';
import {Button, View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';

import {getUser, removeUser} from '../utils/StorageHelper';

import ListItem from '../components/ListItem';
import Icon from 'react-native-vector-icons/Entypo';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      listData: [
        {key: 'Security', status: 'completed', icon: 'lock'},
        {key: 'Operations', status: 'invalid', icon: 'briefcase'},
        {key: 'Airport System', status: 'pending', icon: 'paper-plane'},
        {key: 'Commercial', status: 'completed', icon: 'shop'},
      ],
    };

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
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{position: 'absolute', top: 20, left: 20, elevation: 2}}>
            <Icon name="menu" size={30} color="#fff" />
          </View>

          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            }}
            style={{height: 150}}
          />

          <View style={styles.colorOverlay} />

          <View style={styles.menuBoxContainer}>
            <View style={styles.menuBox}>
              <Text style={{color: '#0aa5de', ...styles.menuBoxText}}>55</Text>
              <Text style={styles.menuBoxDesc}>Issues Reported</Text>
            </View>
            <View style={styles.menuBox}>
              <Text style={{color: '#54c881', ...styles.menuBoxText}}>03</Text>
              <Text style={styles.menuBoxDesc}>Issues Resolved</Text>
            </View>
            <View style={styles.menuBox}>
              <Text style={{color: '#f5ad18', ...styles.menuBoxText}}>45</Text>
              <Text style={styles.menuBoxDesc}>Pending</Text>
            </View>
          </View>
        </View>

        {/* <ScrollView> */}
        <View style={styles.listContainer}>
          <FlatList
            contentContainerStyle={styles.listContentContainer}
            data={this.state.listData}
            renderItem={({item}) => (
              <ListItem name={item.key} status={item.status} icon={item.icon} />
            )}
          />
        </View>
        {/* </ScrollView> */}

        {/* <View style={{marginTop: 10}}>
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
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuBoxContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  menuBox: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  menuBoxText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  menuBoxDesc: {
    textAlign: 'center',
    fontSize: 11,
    marginTop: 5,
    color: '#222',
  },
  colorOverlay: {
    backgroundColor: '#5f00cc5c',
    height: 150,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  listContainer: {
    flex: 3,
    flexGrow: 3,
    // position: 'absolute',
    left: 0,
    right: 0,
    top: 10,
    overflow: 'scroll',
  },
  listContentContainer: {
    paddingBottom: 20,
    paddingTop: 55,
    paddingHorizontal: 15,
  },
});
