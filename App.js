import React from 'react';
import { SignIn, ForgotPassword, SignUp } from './screens'

import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();


export default function App() {
  //Load font,
  const [loaded] = useFonts({
    "HoustanderDemo": require('./assets/fonts/HoustanderDemo.ttf'),
    "Quicksand-Light": require('./assets//fonts/Quicksand-Light.ttf'),
    "Quicksand-Bold": require('./assets//fonts/Quicksand-Bold.ttf'),
    
    
  })
  if(!loaded) {
    return null;
  }
  // =======================

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'SignIn'}
      >
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
  },
});
