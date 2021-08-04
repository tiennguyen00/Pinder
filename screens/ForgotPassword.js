import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../server/firebase';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { images, COLORS, FONTS, icon, SIZES, icons } from '../constants';
import * as Animatable from 'react-native-animatable';
import Field from '../components/Field';
import Modal1 from '../components/Modal1';

import axios from 'axios';
import { ipAdress } from '../config/ipAdress';

import { hideLoading, showLoading } from '../redux';

export default function ForgotPassword({ route, navigation }) {
  const [userName, setUserName] = useState('');
  const [passwordReturn, setPasswordReturn] = useState('');
  const [activeSendIt, setActiveSendIt] = useState(false);
  const [isValidUser, setisValidUser] = useState('');

  const [visiblePop, setVisiblePop] = useState('init');
  const [visiblePopWrong, setVisiblePopWrong] = useState(false);


  const dispatch = useDispatch();


  const renderLogo = () => {
    return (
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          flex: 2,
        }}
      >
        <Image
          source={images.logo}
          resizeMode="contain"
          style={{
            width: "80%",
            height: "50%"
          }}
        />
      </View>
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
        dispatch(hideLoading());
        setVisiblePop(true);
      }
    }, [is]);
    const handeleSendIt = async () => {
      let result = 0;
      if (activeSendIt) {
        dispatch(showLoading());
        await db.collection("users").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().userName == userName) {
              setPasswordReturn(doc.data().password);
              result = 1;
            }
          });
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
      }
    }
    //======================================

    const handleChangeText = (val) => {
      if (val.length < 3) {
        setisValidUser('*Username must be at least 3 characters');
        setActiveSendIt(false);
      } else if (!userName.match(/^[a-zA-Z0-9]+$/)) {
        setisValidUser('*Only characters A-Z, a-z and 0-9');
        setActiveSendIt(false);
      }
      else {
        setisValidUser('');
        setActiveSendIt(true);
      }
      setUserName(val);
    }

    return (
      <View
        style={{
          flex: 1.1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%"
        }}
      >
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.orangeHeight,
            textAlign: 'center',
            width: "80%",
            marginBottom: 15
          }}
        >Enter your Username and I will send password for you!!</Text>
        <Field
          placeholder="Username"
          placeholderTextColor="#695599"
          maxLength={12}
          underlineColorAndroid="transparent"
          onChangeText={text => handleChangeText(text)}
          // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          source={icons.profile_signin}
        />
        {isValidUser == '' ? null :
          <Animatable.View animation="fadeInLeft" duration={800}>
            <Text style={styles.errMsg}>{isValidUser}</Text>
          </Animatable.View>
        }
        <TouchableOpacity
          style={styles.button}
          onPress={() => handeleSendIt()}
        >
          <Text style={(activeSendIt) ? styles.textActive : styles.text} >Send it</Text>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Pressable
            style={{
              marginBottom: 40

            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textSecondary}>Back to SignIn</Text>
          </Pressable>
        </View>
      </View>

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
            source={icons.cool}
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
          Your password is: {passwordReturn}
        </Text>
      </Modal1>

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
            source={icons.sulk}
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
          userName is not correct !!
        </Text>
      </Modal1>

      <ImageBackground
        source={images.background}
        style={styles.container}
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: COLORS.primaryLight,
    marginTop: 15
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