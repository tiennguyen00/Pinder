import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TouchableWithoutFeedback, Image, Text, DrawerLayoutAndroid } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { COLORS, icons, FONTS } from '../constants';
import { setSelectedTabSuccess, setSelectedTab } from '../redux/tab/tabActions';
import { State } from 'react-native-gesture-handler';

const TabButton = ({label, icon, isFocused, onPress, outerContainerStyle, innerContainerStyle}) => {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <Animated.View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          },
          // outerContainerStyle
        ]}
      >
        <Animated.View
          style={[
            {
            flexDirection: 'row',
            width:'80%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25 
          },
          // innerContainerStyle
        ]}
        >
          <Image
            source={icon}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.primaryLight
            }}
          />

          {isFocused && 
            <Text
              numberOfLines={1}
              style={{
                marginLeft: 10,
                color: COLORS.primaryLight,
                ...FONTS.h4
              }}
            >
              {label}
            </Text>
          }
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default function Home() {
  global.__reanimatedWorkletInit = () => {};

  const f = () => {
    'worklet';
    console.log('Si');
  };

  console.log(f);

  const dispatch = useDispatch();
  const selectedTab = useSelector(state =>  state.tabReducer.selectedTab);

  // useEffect(() => {
  //   if (selectedTab == 'Home') {
  //     homeTabFlex.value = withTiming(4, { duration: 500 });
  //     homeTabColor.value = withTiming(COLORS.gray, { duration: 500 })
  //   }
  //   else {
  //     homeTabFlex.value = withTiming(1, { duration: 500 });
  //     homeTabColor.value = withTiming(COLORS.white, { duration: 500 })
  //   }
  // }, [selectedTab])

  // Reanimated Shared Value
    // const homeTabFlex = useSharedValue(1)
    // const homeTabColor = useSharedValue(COLORS.white)
    // const rankTabFlex = useSharedValue(1)
    // const rankTabColor = useSharedValue(COLORS.white)
    // const loveTabFlex = useSharedValue(1)
    // const loveTabColor = useSharedValue(COLORS.white)
    // const profileTabFlex = useSharedValue(1)
    // const profileTabColor = useSharedValue(COLORS.white)

  //Reanimated Animated Style
  // const homeFlexStyle = useAnimatedStyle(() => {
  //   return {
  //     flex: homeTabFlex.value
  //   }
  // })
  // const homeColorStyle = useAnimatedStyle(() => {
  //   return {
  //     backgroundColor: homeTabColor.value
  //   }
  // })
  // const rankFlexStyle = useAnimatedStyle(() => {
  //   return {
  //     flex: rankTabFlex.value
  //   }
  // })
  // const rankColorStyle = useAnimatedStyle(() => {
  //   return {
  //     backgroundColor: rankTabColor.value
  //   }
  // })
  // const loveFlexStyle = useAnimatedStyle(() => {
  //   return {
  //     flex: loveTabFlex.value
  //   }
  // })
  // const loveColorStyle = useAnimatedStyle(() => {
  //   return {
  //     backgroundColor: loveTabColor.value
  //   }
  // })
  // const profileFlexStyle = useAnimatedStyle(() => {
  //   return {
  //     flex: profileTabFlex.value
  //   }
  // })
  // const profileColorStyle = useAnimatedStyle(() => {
  //   return {
  //     backgroundColor: profileTabColor.value
  //   }
  // })


  return (
    <View
      style={styles.container}
    >
      {/* Bottom naviation */}
      <View
        style={{
          height: 60,
        }}
      >
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 4}}
          colors={[
            COLORS.transparent,
            COLORS.gray
          ]}
          style={{
            position: 'absolute',
            top: -20,
            left: 0,
            right: 0,
            height: '100%',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
          }}
        />
        {/* Tabs */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 10,
            paddingBottom: 10,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: COLORS.white
          }}
        >
          <TabButton
            label='Home'
            icon={icons.home}
            isFocused={selectedTab == 'Home'}
            // outerContainerStyle={homeFlexStyle}
            // innerContainerStyle={homeColorStyle}
            onPress={()=>dispatch(setSelectedTab('Home'))}
          />
          <TabButton
            label='Rank'
            icon={icons.rank}
            isFocused={selectedTab == 'Rank'}
            // outerContainerStyle={rankFlexStyle}
            // innerContainerStyle={rankColorStyle}
            onPress={()=>dispatch(setSelectedTab('Rank'))}
          />
          <TabButton
            label='Love'
            icon={icons.love}
            isFocused={selectedTab == 'Love'}
            // outerContainerStyle={loveFlexStyle}
            // innerContainerStyle={loveColorStyle}
            onPress={()=>dispatch(setSelectedTab('Love'))}
          />
          <TabButton
            label='Profile'
            icon={icons.profile}
            isFocused={selectedTab == 'Profile'}
            // outerContainerStyle={profileFlexStyle}
            // innerContainerStyle={profileColorStyle}
            onPress={()=>dispatch(setSelectedTab('Profile'))}
          />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#000',
    justifyContent: 'flex-end'
  }
})
