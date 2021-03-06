import React from 'react';
import { SignIn, ForgotPassword, SignUp, Splash, Home } from './screens';
import Loading from './components/Loading';
import { Provider } from 'react-redux';
import store from './redux/store';

import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { View } from 'react-native-animatable';

const Stack = createStackNavigator();

export default function App() {
  //Load font,
  const [loaded] = useFonts({
    "HoustanderDemo": require('./assets/fonts/HoustanderDemo.ttf'),
    "Quicksand-Light": require('./assets//fonts/Quicksand-Light.ttf'),
    "Quicksand-Bold": require('./assets//fonts/Quicksand-Bold.ttf'),


  })
  if (!loaded) {
    return null;
  }
  // =======================

  return (
    <Provider store={store} >
      <Loading />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName={'Splash'}
        >

          <Stack.Screen
            name="Splash"
            component={Splash}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
          />
          <Stack.Screen
            name="Home"
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
  },
});
