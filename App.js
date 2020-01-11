import React from 'react';
import {Text, TouchableWithoutFeedback} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SplashScreen from './screen/SplashScreen';
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';

const AppNavigator = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: ({navigation}) => ({
        headerRight: () => (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={{paddingHorizontal: 15}}>Sign up</Text>
          </TouchableWithoutFeedback>
        ),
      }),
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: ({navigation}) => ({
        headerRight: () => (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={{paddingHorizontal: 15}}>Log in</Text>
          </TouchableWithoutFeedback>
        ),
      }),
    },
  },
  {
    initialRouteName: 'Splash',
    defaultNavigationOptions: ({navigation}) => ({
      headerTitleAlign: {alignItem: 'right'},
      headerTitle: () => null,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: '#f5f5f3',
      },
      headerTintColor: '#43cdbb',
      headerRight: () => (
        <Text style={{paddingHorizontal: 15}}>
          {navigation.state.routeName}
        </Text>
      ),
      title: 'test',
    }),
  },
);

export default createAppContainer(AppNavigator);
