import AsyncStorage from '@react-native-community/async-storage';

export async function getUser() {
  try {
    const user = await AsyncStorage.getItem('user');

    return JSON.parse(user);
  } catch (e) {
    throw e;
  }
}

export async function storeUser(user) {
  if (typeof user === 'object') {
    user = JSON.stringify(user);
  }

  try {
    await AsyncStorage.setItem('user', user);
  } catch (e) {
    throw e;
  }
}

export async function removeUser() {
  try {
    await AsyncStorage.removeItem('user');
  } catch (e) {
    throw e;
  }
}
