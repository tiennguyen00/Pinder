import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Animated,
  TouchableOpacity,
  ScrollView,
  Pressable
} from 'react-native';
import { images, SIZES, icons, COLORS, FONTS } from '../constants';
import * as Animatable from 'react-native-animatable';
import { interpolate, Value } from 'react-native-reanimated';
import { useTransition } from 'react-native-redash'

import Field from '../components/Field';
import { NavigationContainer } from '@react-navigation/native';

export default function SignUp({ navigation }) {

  const renderLogo = () => {
    return (
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flex: 1
        }}
      >
        <Image
          source={images.logo}
          // resizeMode="contain"
          style={{
            width: "100%",
            height: "100%"
          }}
        />
      </View>
    )
  }

  const renderUsernamePassword = () => {
    const translateY = new Animated.Value(150);
    const translateY1 = new Animated.Value(0);
    const opacity = new Animated.Value(0.3);

    useEffect(() => {
      Animated.timing(translateY, {
        delay: 200,
        duration: 1000,
        toValue: 70,
        useNativeDriver: true
      }).start()

      Animated.timing(translateY1, {
        delay: 200,
        duration: 1000,
        toValue: -80,
        useNativeDriver: true
      }).start()

      Animated.timing(opacity, {
        duration: 1000,
        toValue: 1,
        useNativeDriver: true
      }).start()
    }, [])

    return (
      <>
        <Animated.View
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            height: "100%",
            flex: 2,
            transform: [{ translateY: translateY }]
          }}
        >
          <Image
            source={images.bg_signup1}
            // resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              marginTop: 0
            }}
          />

        </Animated.View>

        <Animated.View
          style={{
            flex: 1.8,
            justifyContent: 'flex-start',
            alignItems: 'center',
            transform: [{ translateY: translateY1 }],
            opacity: opacity,
          }}
        >
          <Field
            placeholder="Username"
            placeholderTextColor="#695599"
            maxLength={8}
            source={icons.profile_signin}
          />
          <Field
            placeholder="Password"
            placeholderTextColor="#695599"
            secureTextEntry={true}
            maxLength={8}
            source={icons.lock}
          />
          <Field
            placeholder="Confirm Password"
            placeholderTextColor="#695599"
            secureTextEntry={true}
            maxLength={8}
            source={icons.confirm_lock}
          />


        <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Press signup")}
          >
            <Text
              style={styles.textActive}
            >Sign up</Text>
          </TouchableOpacity> 

           


        <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Pressable
              style={{
                marginBottom: 10
              }}
              onPress={() => {navigation.goBack();}}
            >
              <Text style={styles.textSecondary}>Back to SignIn</Text>
            </Pressable>
          </View>
         

        </Animated.View>
     

       

      </>


    )

  }

  return (
    <ScrollView>
      <ImageBackground
        style={styles.container}
        source={images.bg_signup}
      >
        <View
          style={{
            flex: 1,
            width: SIZES.width,
            height: SIZES.height,
          }}
        >
          {renderLogo()}
          {renderUsernamePassword()}
        </View>
      </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    paddingTop: 30
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: COLORS.primaryLight,
    marginTop: 15,
    marginBottom: 50
  },
  textActive: {
    ...FONTS.h3_bold,
    color: COLORS.white,
    paddingRight: 25,
    paddingLeft: 25,
    paddingBottom: 8,
  },
  textSecondary: {
    ...FONTS.body3,
    color: COLORS.gray,

  },
});