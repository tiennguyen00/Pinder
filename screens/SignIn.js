import React from 'react';
import { View, 
  Text, 
  Image, 
  ImageBackground, 
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  ColorPropType
} from 'react-native';
import { icons, images, COLORS, FONTS, SIZES } from '../constants';

export default function SignIn() {

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
            marginBottom: 15
          }}
        >
          <TextInput
            placeholder="Username"
            style={styles.input}
            placeholderTextColor="#695599"
            maxLength={12}
            underlineColorAndroid="transparent"
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
            marginBottom: 15
          }}
        >
          <TextInput
            placeholder="Password"
            style={styles.input}
            placeholderTextColor="#695599"
            secureTextEntry={true}
            maxLength={8}
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

        <View
          style={{
            width: '70%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
            marginTop: 15
          }}
        >
           <Pressable
            style={styles.button}
           >
             <Text
              style={styles.textActive}
             >Sign up</Text>
           </Pressable>

           <Pressable
            style={styles.button}
           >
             <Text
              style={styles.text}
             >Sign in</Text>
           </Pressable>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Pressable 
            style={{
              marginTop: 30
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
  }
})