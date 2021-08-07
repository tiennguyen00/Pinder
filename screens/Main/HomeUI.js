import { auto } from 'async'
import React from 'react'
import { 
  View, 
  Text,
  TextInput,
  Image
}from 'react-native'
import { COLORS, FONTS, icons, SIZES, images } from '../../constants'

export default function HomeUI(props) {
  const renderHeader = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          borderBottomLeftRadius: 40,
          paddingHorizontal: 30,
          paddingTop: 50
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={{ ...FONTS.h1_bold, color: COLORS.primaryHeight }}>Hi, {props.userDetail.userName}!</Text>
            <Text style={{ ...FONTS.h4, color: COLORS.primaryHeight, marginTop: 10 }}>How about is your day?</Text>
          </View>
          <Image
            source={images.profile_picture}
            resizeMode="cover"
            style={{
              width: 65,
              height: 65,
              borderRadius: 75
            }}
          />
        </View>
        <View
          style={{
            position: 'relative',
            flexDirection: 'row',
            paddingRight: 50,
            paddingLeft: 10,
            backgroundColor: COLORS.gray,
            marginTop: "10%",
            height: 50,
            borderRadius: 10
          }}
        >
          <Image 
            source={icons.search} 
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.primaryHeight,
              bottom: -15,
              marginRight: 20
            }}
          />
          <TextInput 
            placeholder="Search something"
            placeholderTextColor="#777"
            style={{
              borderWidth: 0,
              color: COLORS.primaryHeight,
              fontSize: 18,
              width: "100%",
              
            }}
          />
        </View>
      </View>
    )
  }
  const renderContent = () => {
    return (
      <View
        style={{
          flex: 4,
          paddingTop: 30
        }}
      >
        <Text>Content</Text>
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        width: SIZES.width,
        height: SIZES.height
      }}
    >
      {renderHeader()}
      {renderContent()}
    </View>
  )
}
