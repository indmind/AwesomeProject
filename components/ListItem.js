import React, {Component} from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.statusColor = {
      completed: 'green',
      invalid: 'red',
      pending: 'yellow',
    };
  }
  render() {
    return (
      <View style={styles.listItem}>
        <View style={styles.itemIconContainer}>
          <Icon name={this.props.icon} size={50} />
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{this.props.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.itemCategory}>Sidewalks</Text>
            <Text style={styles.itemCategory}>Windows</Text>
          </View>
          <Text>
            <Text style={styles.reportText}>Reported By</Text>{' '}
            <Text style={styles.reportName}>Jhon</Text>
          </Text>
        </View>
        <View style={styles.itemStatusContainer}>
          <Text
            style={{
              color: this.statusColor[this.props.status],
              ...styles.itemStatus,
            }}>
            {this.props.status.toUpperCase()}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: 'white',
    margin: 7,
    borderRadius: 10,
    height: 100,
    flexDirection: 'row',
    elevation: 3,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  itemName: {
    fontWeight: 'bold',
    color: '#444',
  },
  itemCategory: {
    fontSize: 10,
    marginRight: 5,
    backgroundColor: 'lightgrey',
    color: '#222',
    padding: 1,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  itemInfo: {
    flex: 3,
    height: 100,
    justifyContent: 'space-between',
    paddingVertical: 17,
    alignItems: 'flex-start',
  },
  itemIconContainer: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStatusContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  itemStatus: {
    fontSize: 10,
  },
  reportText: {
    fontSize: 11,
    color: 'gray',
  },
  reportName: {
    fontWeight: 'bold',
    color: '#444',
  },
});
