import React, { useMemo } from 'react';
import { 
  View,
  Image,
  Text
} from 'react-native'
import { COLORS, FONTS, SIZES, icons } from '../constants';

export default function Card(props) {
  const randomBool = useMemo(() =>  Math.random() < 0.5, [])
  const { item } = props;
  const ratio = ((SIZES.width-30)/2)/item.imageWidth

  return (
    <View 
      key={item.id} 
      style={{
        flex: 1,
        marginHorizontal: 5,
        height: randomBool ? 150 : 280,
        marginBottom: 10
      }} 
    >
      <Image
        source={{uri: item.urls }}
        style={{
          height: "100%",
          // alignSelf: 'stretch',
          borderRadius: 20,
        }}
        resizeMode='cover'
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0
        }}
      >
      <Text
        style={{
          ...FONTS.h4,
          color: COLORS.white,
          marginLeft: 15
        }}
      >
        {item.user}
      </Text>

      <View
        style={{

          marginBottom: 10,
          marginTop: 5,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          // opacity: 0.5,
          padding: 5,
          borderRadius: 10,
          flexDirection: 'row',
          marginLeft: 10,
          width: 65
        }}
      >
        <Image
          source={icons.love}
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.red,
            transform: [{ translateY: 2 }]
          }}
        />
        <Text style={{ ...FONTS.h4  , color: COLORS.black, marginLeft: 3, fontWeight: "600"}} >{item.likes}</Text>
      </View> 
      </View>
      
    </View>
  )
}
