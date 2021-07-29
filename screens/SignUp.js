import React, { useEffect, useRef, useState } from 'react';
import { db } from '../server/firebase';
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
import { interpolate, useSharedValue, Value } from 'react-native-reanimated';
import { useTransition } from 'react-native-redash'

import Field from '../components/Field';
import Modal1 from '../components/Modal1';
import axios from 'axios';
import { ipAdress } from '../config/ipAdress';

export default function SignUp({ navigation }) {

  const [activeSignIn, setActiveSignIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isValidUsername, setisValidUsername] = useState('');
  const [isValidPassword, setisValidPassword] = useState('');

  const [visiblePop, setVisiblePop] = useState(false);


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
    const translateY = useRef(new Animated.Value(170)).current;
    const translateY1 = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
      Animated.timing(translateY, {
        delay: 0,
        duration: 1000,
        toValue: 95,
        useNativeDriver: true
      }).start()

      Animated.timing(translateY1, {
        delay: 50,
        duration: 1000,
        toValue: -50,
        useNativeDriver: true
      }).start()

      Animated.timing(opacity, {
        duration: 1000,
        toValue: 1,
        useNativeDriver: true
      }).start()
    }, [])

    useEffect(() => {
      if (!isValidUsername && !isValidPassword && confirmPassword && userName) {
        setActiveSignIn(true);
      }
      else
        setActiveSignIn(false);
    }, [isValidUsername, isValidPassword, confirmPassword,])

    const handleConirmPassword = (val) => {
      if (val !== password.slice(0, val.length))
        setisValidPassword('*Password and confirm password don\'t match');
      else {
        setisValidPassword('');
      }

      if (val === password)
        setConfirmPassword(val);
      else
        setConfirmPassword('');
    }

    const hanldeValidUsername = (val) => {
      if (val.length < 3) {
        setisValidUsername('*Username must be at least 3 characters');
      } else if (!val.match(/^[a-zA-Z0-9]+$/)) {
        setisValidUsername('*Only characters A-Z, a-z and 0-9');
      }
      else {
        setisValidUsername('');
      }
    }
    const hanldeValidPassword = (val) => {
      if (val.length < 4) {
        setisValidPassword('*Password must be at least 4 characters')
      }
      else {
        setisValidPassword('');
      }
    }

    const handleSignUp = async () => {
      if (activeSignIn) {
        await db.collection("users").add({
          userName,
          password
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
        setVisiblePop(true)
      }
      else {
      }

    }

    return (
      <>
        <Animated.View
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            height: "100%",
            flex: 2,
            transform: [{ translateY: translateY }],
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
            maxLength={15}
            source={icons.profile_signin}
            onEndEditing={(e) => hanldeValidUsername(e.nativeEvent.text)}
            onChangeText={text => setUserName(text)}
          />
          {isValidUsername == '' ? null :
            <Animatable.View animation="fadeInLeft" duration={800}>
              <Text style={styles.errMsg}>{isValidUsername}</Text>
            </Animatable.View>
          }
          <Field
            placeholder="Password"
            placeholderTextColor="#695599"
            secureTextEntry={true}
            maxLength={15}
            source={icons.lock}
            onChangeText={text => setPassword(text)}
            onEndEditing={(e) => hanldeValidPassword(e.nativeEvent.text)}
          />
          {isValidPassword == '' ? null :
            <Animatable.View animation="fadeInLeft" duration={800}>
              <Text style={styles.errMsg}>{isValidPassword}</Text>
            </Animatable.View>
          }

          <Field
            placeholder="Confirm Password"
            placeholderTextColor="#695599"
            secureTextEntry={true}
            maxLength={8}
            source={icons.confirm_lock}
            onChangeText={text => handleConirmPassword(text)}
          />


          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSignUp()}
          >
            <Text
              style={(activeSignIn) ? styles.textActive : styles.text}
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
              onPress={() => { navigation.goBack(); }}
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
      <Modal1
        visible={visiblePop}
      >
        <View style={{ alignItems: 'center' }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => { setTimeout(() => setVisiblePop(false), 200) }}>
              <Image
                source={icons.close}
                style={{
                  width: 25,
                  height: 25
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={icons.success}
            style={{
              height: 150,
              width: 150,

            }}
          />
        </View>
        <Text
          style={{
            marginVertical: 20,
            fontSize: 20,
            textAlign: 'center'
          }}
        >
          Congratulations registeration was successful
        </Text>
      </Modal1>
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
  },
  textActive: {
    ...FONTS.h3_bold,
    color: COLORS.white,
    paddingRight: 25,
    paddingLeft: 25,
    paddingBottom: 8,
  },
  text: {
    ...FONTS.h3_bold,
    color: COLORS.primaryLight,
    paddingRight: 25,
    paddingLeft: 25,
    paddingBottom: 8,
  },
  textSecondary: {
    ...FONTS.body3,
    color: COLORS.gray
  },
  errMsg: {
    ...FONTS.body5,
    color: COLORS.red
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  }
});