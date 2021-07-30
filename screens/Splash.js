import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { images, COLORS } from '../constants';


export default function Splash({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primaryLight
      }}
    >
      <LottieView
        source={images.splash}
        autoPlay
        loop={false}
        speed={0.8}
        onAnimationFinish={() => navigation.navigate("SignIn")}
      />
    </View>
  )
}
