import React from 'react';
import { View, Text, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import { images } from '../constants';
import { SIZES } from '../constants';
import { useSelector } from 'react-redux';

const loading = state => state.loadingReducer.visible;

export default function Loading() {
  const isLoading = useSelector(loading);

  return (
    <Modal transparent visible={isLoading}>
      <View
        style={{
          opacity: 0.4,
          position: 'absolute',
          width: SIZES.width,
          height: SIZES.height,
          backgroundColor: '#000',
          zIndex: 100,
        }}
      >
      <LottieView
        source={images.loading}
        autoPlay
        loop={true}
        speed={2}
      />
    </View>
    </Modal>
  )
}
