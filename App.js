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
        header: null,
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
    },
    Register: {
      screen: RegisterScreen,
    },
  },
  {
    initialRouteName: 'Splash',
    defaultNavigationOptions: ({navigation}) => ({
      headerTitleAlign: {alignItem: 'right'},
      headerTitle: null,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: 'transparent',
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
