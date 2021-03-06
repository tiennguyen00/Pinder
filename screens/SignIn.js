import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../server/firebase';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Animated,
  KeyboardAvoidingView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { icons, images, COLORS, FONTS, SIZES } from '../constants';
import Field from '../components/Field';
import Modal1 from '../components/Modal1';

import { hideLoading, showLoading } from '../redux';

export default function SignIn({ navigation }) {

  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const [userId, setUserId] = useState('');
  const [activeSignIn, setActiveSignIn] = useState(false);
  const [isValidUser, setisValidUser] = useState('');
  const [isValidPassword, setisValidPassword] = useState('');

  const [visiblePop, setVisiblePop] = useState(false);
  const [visiblePopWrong, setVisiblePopWrong] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (userName && password) {
      setActiveSignIn(true);
    }
    else {
      setActiveSignIn(false);
    }
  }, [userName, password]);

  const renderLogo = () => {
    useEffect(() => {
      Animated.timing(opacity, {
        delay: 0,
        duration: 3000,
        toValue: 1,
        useNativeDriver: true
      }).start()
    }, [])

    return (
      <Animated.View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          flex: 2,
          opacity: opacity
        }}

      >
        <Image
          source={images.logo}
          resizeMode="contain"
          style={{
            width: "80%",
            height: "50%",
          }}
        />
      </Animated.View>
    )
  }

  const renderUsernamePassword = () => {
    //===========Handle response after submit;
    const [is, setIs] = useState();
    useEffect(() => {
      if (is == false) {
        dispatch(hideLoading());
        setVisiblePopWrong(true);
      }
      if (is == true) {
        setVisiblePop(true);
        dispatch(hideLoading());
        navigation.navigate('Home', {
          userId,
          userName,
          password
        });
      }
    }, [is]);
    const handleSignIn = async () => {
      if (activeSignIn) {
        dispatch(showLoading());
        let result = 0;
        await db.collection("users").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().userName == userName && doc.data().password == password) {
              setUserId(doc.id);
              result = 1;
            }
          });
          if (!result) {
            setIs(false)
          }
          else {
            setIs(true)
          }
          setTimeout(() => {
            setIs();
          }, 1000)
        });
      }
    }
    //=====================================

    const handleValidUser = (val) => {
      if (val.length < 3) {
        setisValidUser('*Username must be at least 3 characters')
      } else if (!val.match(/^[a-zA-Z0-9]+$/)) {
        setisValidUser('*Only characters A-Z, a-z and 0-9')
      }
      else {
        setisValidUser('');
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

    return (
      <View
        style={{
          flex: 1.1,
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%"
        }}
      >
        <Field
          placeholder="Username"
          placeholderTextColor="#695599"
          maxLength={12}
          underlineColorAndroid="transparent"
          onChangeText={text => setUserName(text)}
          onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          source={icons.profile_signin}
        />
        {isValidUser == '' ? null :
          <Animatable.View animation="fadeInLeft" duration={800}>
            <Text style={styles.errMsg}>{isValidUser}</Text>
          </Animatable.View>
        }

        <Field
          placeholder="Password"
          placeholderTextColor="#695599"
          secureTextEntry={true}
          maxLength={15}
          onChangeText={text => setPassWord(text)}
          onEndEditing={(e) => hanldeValidPassword(e.nativeEvent.text)}
          source={icons.lock}
        />
        {isValidPassword == '' ? null :
          <Animatable.View animation="fadeInLeft" duration={800}>
            <Text style={styles.errMsg}>{isValidPassword}</Text>
          </Animatable.View>
        }

        <View
          style={{
            width: '70%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
            marginTop: 15
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text
              style={styles.textActive}
            >Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSignIn()}
          >
            <Text
              style={(activeSignIn) ? styles.textActive : styles.text}
            >Sign in</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Pressable
            style={{
              marginBottom: 10

            }}
            onPress={() => navigation.navigate("ForgotPassword", {
              userName: userName
            })}
          >
            <Text style={styles.textSecondary}>Forgot Password?</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <ScrollView>

      <Modal1
        visible={visiblePopWrong}
      >
        <View style={{ alignItems: 'center' }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => { setTimeout(() => setVisiblePopWrong(false), 200) }}>
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
            source={icons.opps}
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
          Sorry but something wrong, Have you input correct userName or password!?
        </Text>
      </Modal1>

      <ImageBackground
        style={styles.container}
        source={images.background}
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
    borderColor: COLORS.primaryLight
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
})