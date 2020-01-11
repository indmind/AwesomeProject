import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';

import {getUser, removeUser} from '../utils/StorageHelper';

import ListItem from '../components/ListItem';
import Icon from 'react-native-vector-icons/Entypo';

const headerHeight = 160;
const menuBoxSize = 100;
const contentMargin = 20;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listHeight: this.computeListHeight(),
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

  onLayout(event) {
    this.setState({listHeight: this.computeListHeight()});
  }

  computeListHeight() {
    return Dimensions.get('window').height - headerHeight;
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
      <View
        style={{flex: 1, backgroundColor: '#f8f8f8'}}
        onLayout={this.onLayout.bind(this)}>
        <StatusBar backgroundColor="#37469b" barStyle="light-content" />

        <View style={{flex: 0}}>
          <View style={styles.menuIcon}>
            <TouchableHighlight
              onLongPress={async () => {
                await removeUser();

                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({routeName: 'Login'})],
                });

                this.props.navigation.dispatch(resetAction);
              }}>
              <Icon name="menu" size={30} color="#fff" />
            </TouchableHighlight>
          </View>

          <Image
            source={{
              uri:
                'https://aviatren.com/wp-content/uploads/2019/08/An-Emirates-Airbus-A380-1205x786.jpg',
            }}
            style={{height: headerHeight}}
          />

          <View style={styles.colorOverlay} />

          <View style={styles.menuBoxContainer}>
            <View style={styles.menuBox}>
              <Text style={[styles.menuBoxText, {color: '#0aa5de'}]}>55</Text>
              <Text style={styles.menuBoxDesc}>Issues Reported</Text>
            </View>
            <View style={styles.menuBox}>
              <Text style={[styles.menuBoxText, {color: '#54c881'}]}>03</Text>
              <Text style={styles.menuBoxDesc}>Issues Resolved</Text>
            </View>
            <View style={styles.menuBox}>
              <Text style={[styles.menuBoxText, {color: '#f5ad18'}]}>45</Text>
              <Text style={styles.menuBoxDesc}>Pending</Text>
            </View>
          </View>
        </View>

        <View style={[styles.listContainer, {height: this.state.listHeight}]}>
          <FlatList
            contentContainerStyle={styles.listContentContainer}
            data={this.state.listData}
            renderItem={({item}) => (
              <ListItem name={item.key} status={item.status} icon={item.icon} />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuBoxContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: headerHeight - menuBoxSize / 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: contentMargin,
  },
  menuIcon: {
    position: 'absolute',
    zIndex: 2,
    top: contentMargin,
    left: contentMargin,
    elevation: 2,
  },
  menuBox: {
    width: menuBoxSize,
    height: menuBoxSize,
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
    // fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
  },
  menuBoxDesc: {
    textAlign: 'center',
    fontSize: 11,
    marginTop: 5,
    color: '#444',
    fontWeight: 'bold',
  },
  colorOverlay: {
    backgroundColor: '#37469bdd',
    height: headerHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  listContainer: {
    flex: 2,
    flexGrow: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: headerHeight,
    // height: Dimensions.get('window').height - headerHeight,
    backgroundColor: '#f8f8f8',
    overflow: 'scroll',
  },
  listContentContainer: {
    paddingBottom: 10,
    paddingTop: menuBoxSize / 2 + 8,
    paddingHorizontal: contentMargin,
  },
});
