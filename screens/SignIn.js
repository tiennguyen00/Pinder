import React, { useState, useEffect } from 'react';
import { View, 
  Text, 
  Image, 
  ImageBackground, 
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { icons, images, COLORS, FONTS, SIZES } from '../constants';

export default function SignIn() {

  const [userName, setUserName] = useState('');
  const [password, setPassWord] = useState(''); 
  const [activeSignIn, setActiveSignIn] = useState(false);
  const [isValidUser, setisValidUser] = useState('');
  const [isValidPassword, setisValidPassword] = useState('');

  useEffect(()=>{
    if(userName && password) {
      setActiveSignIn(true);
    }
    else {
      setActiveSignIn(false);
    }
  }, [userName, password]);

  const renderLogo = () => {
    return (
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flex: 2
        }}
      >
        <Image
          source={images.logo}
          // resizeMode="contain"
          style={{
            width: "100%",
            height: "50%"
          }}
        />
      </View>
    )
  }

  const renderUsernamePassword = () => {
    const handleValidUser = (val) => {
      if(val.length < 3) {
        setisValidUser('*Username must be at least 3 characters')
      }else if (!val.match(/^[a-zA-Z0-9]+$/)) {
        setisValidUser('*Only characters A-Z, a-z and 0-9')
      }
      else {
        setisValidUser('');
      }
    }

    const hanldeValidPassword = (val) => {
      if(val.length < 4) {
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: COLORS.primaryLight,
            height: 40,
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            // marginBottom: 15
          }}
        >
          <TextInput
            placeholder="Username"
            style={styles.input}
            placeholderTextColor="#695599"
            maxLength={12}
            underlineColorAndroid="transparent"
            onChangeText={text => setUserName(text)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          <Image
            source={icons.profile_signin}
            resizeMode='center'
            style={{
              width: 24,
              height: 24,
              tintColor: COLORS.purpleLight,
              height: '100%',
              bottom: 0,
            }}
          />
        </View>
        {isValidUser=='' ? null :   
          <Animatable.View animation="fadeInLeft" duration={800}>
            <Text style={styles.errMsg}>{isValidUser}</Text>
          </Animatable.View>
        }

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: COLORS.primaryLight,
            height: 40,
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            marginTop: 15
          }}
        >
          <TextInput
            placeholder="Password"
            style={styles.input}
            placeholderTextColor="#695599"
            secureTextEntry={true}
            maxLength={8}
            onChangeText={text => setPassWord(text)}
            onEndEditing={(e) => hanldeValidPassword(e.nativeEvent.text)}
          />
          <Image
            source={icons.lock}
            resizeMode='center'
            style={{
              width: 24,
              height: 24,
              tintColor: COLORS.purpleLight,
              height: '100%',
              bottom: 0,
        
            }}
          />
        </View>
        {isValidPassword=='' ? null :   
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
            marginTop: 30
          }}
        >
           <TouchableOpacity
            style={styles.button}
            
           >
             <Text
              style={styles.textActive}
             >Sign up</Text>
           </TouchableOpacity>

           <TouchableOpacity
            style={styles.button}
           >
             <Text
              style={(activeSignIn) ? styles.textActive : styles.text}
             >Sign in</Text>
           </TouchableOpacity>
        </View>

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
            onPress={() => console.log("HIIi")}
          >
            <Text style={styles.textSecondary}>Forgot Password?</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    paddingTop: 30
  },
  input: {
    ...FONTS.body3,
    borderWidth: 1,
    height: 40,
    padding: 5,
    paddingLeft: 0,
    color: COLORS.purpleLight,
    borderWidth: 0,
    width: '70%'
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
  }
})