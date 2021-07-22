import React from 'react';
import { View, StyleSheet,TextInput, Image } from 'react-native';
import { COLORS, FONTS, icons } from '../constants';

export default function Field(props) { 

  return (
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
        {...props}
        style={styles.input}
      />
      <Image
        source={props.source}
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
  )
}

const styles = StyleSheet.create({
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
});
