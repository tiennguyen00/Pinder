import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TouchableWithoutFeedback, Image, Text, DrawerLayoutAndroid, Animated, FlatList } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
// import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { COLORS, icons, FONTS, constant, SIZES } from '../constants';
import { Rank, Love, Profile, HomeUI } from './Main';
import { setSelectedTabSuccess, setSelectedTab } from '../redux/tab/tabActions';


export default function Home() {
  const dispatch = useDispatch();
  const selectedTab = useSelector(state =>  state.tabReducer.selectedTab);
  const flatListRef = useRef();

  const homeTabColor = useRef(new Animated.Value(0)).current;
  const homeTabFlex = useRef(new Animated.Value(1)).current;
  const rankTabColor = useRef(new Animated.Value(0)).current;
  const rankTabFlex = useRef(new Animated.Value(1)).current;
  const loveTabColor = useRef(new Animated.Value(0)).current;
  const loveTabFlex = useRef(new Animated.Value(1)).current;
  const profileTabColor = useRef(new Animated.Value(0)).current;
  const profileTabFlex = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (selectedTab == constant.screens.home) {
      flatListRef?.current?.scrollToIndex({
        index: 0,
        animated: false
      })
      Animated.timing(homeTabFlex, { duration: 500, toValue: 4, useNativeDriver: false}).start();
      Animated.timing(homeTabColor, { duration: 500, toValue: 10, useNativeDriver: false}).start();
    }
    else {
      Animated.timing(homeTabFlex, { duration: 500, toValue: 1, useNativeDriver: false }).start();
      Animated.timing(homeTabColor, { duration: 500, toValue: 0, useNativeDriver: false}).start();
    }
    if (selectedTab == constant.screens.rank) {
      flatListRef?.current?.scrollToIndex({
        index: 1,
        animated: false
      })
      Animated.timing(rankTabFlex, { duration: 500, toValue: 4, useNativeDriver: false}).start();
      Animated.timing(rankTabColor, { duration: 500, toValue: 10, useNativeDriver: false}).start();
    }
    else {
      Animated.timing(rankTabFlex, { duration: 500, toValue: 1, useNativeDriver: false }).start();
      Animated.timing(rankTabColor, { duration: 500, toValue: 0, useNativeDriver: false}).start();
    }
    if (selectedTab == constant.screens.love) {
      flatListRef?.current?.scrollToIndex({
        index: 2,
        animated: false
      })
      Animated.timing(loveTabFlex, { duration: 500, toValue: 4, useNativeDriver: false}).start();
      Animated.timing(loveTabColor, { duration: 500, toValue: 10, useNativeDriver: false}).start();
    }
    else {
      Animated.timing(loveTabFlex, { duration: 500, toValue: 1, useNativeDriver: false }).start();
      Animated.timing(loveTabColor, { duration: 500, toValue: 0, useNativeDriver: false}).start();
    }
    if (selectedTab == constant.screens.profile) {
      flatListRef?.current?.scrollToIndex({
        index: 3,
        animated: false
      })
      Animated.timing(profileTabFlex, { duration: 500, toValue: 4, useNativeDriver: false}).start();
      Animated.timing(profileTabColor, { duration: 500, toValue: 10, useNativeDriver: false}).start();
    }
    else {
      Animated.timing(profileTabFlex, { duration: 500, toValue: 1, useNativeDriver: false }).start();
      Animated.timing(profileTabColor, { duration: 500, toValue: 0, useNativeDriver: false}).start();
    }
  }, [selectedTab])

  
  const TabButton = ({label, icon, isFocused, onPress, innerContainerStyle, outerContainerStyle}) => {
    return (
      <TouchableWithoutFeedback
        onPress={onPress}
      >
        <Animated.View
          style={[
            {
              alignItems: 'center',
              justifyContent: 'center',
              flex: innerContainerStyle
            }
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
              borderRadius: 25,
              backgroundColor: 'transparent'
            },
            {
              backgroundColor: outerContainerStyle.interpolate({
                inputRange: [0, 50],
                outputRange: [COLORS.white, COLORS.purpleHeight],
                extrapolate: 'clamp'
              })
            }
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

  return (
    <View
      style={styles.container}
    >
      {/* Content */}
      <FlatList
        ref={flatListRef}
        horizontal
        scrollEnabled
        snapToAlignment="center"
        snapToInterval={SIZES.width}
        showsHorizontalScrollIndicator={false}
        data={constant.bottom_tabs}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                height: SIZES.height,
                width: SIZES.width
              }}
            >
              {item.label == constant.screens.home && <HomeUI/>}
              {item.label == constant.screens.rank && <Rank/>}
              {item.label == constant.screens.profile && <Profile/>}
              {item.label == constant.screens.love && <Love/>}
            </View>
          )
        }}
      />

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
            label={constant.screens.home}
            icon={icons.home}
            isFocused={selectedTab == constant.screens.home}
            innerContainerStyle={homeTabFlex}
            outerContainerStyle={homeTabColor}
            onPress={()=>dispatch(setSelectedTab(constant.screens.home))}
          />
          <TabButton
            label={constant.screens.rank}
            icon={icons.rank}
            isFocused={selectedTab == constant.screens.rank}
            innerContainerStyle={rankTabFlex}
            outerContainerStyle={rankTabColor}
            onPress={()=>dispatch(setSelectedTab(constant.screens.rank))}
          />
          <TabButton
            label={constant.screens.love}
            icon={icons.love}
            isFocused={selectedTab == constant.screens.love}
            innerContainerStyle={loveTabFlex}
            outerContainerStyle={loveTabColor}
            onPress={()=>dispatch(setSelectedTab(constant.screens.love))}
          />
          <TabButton
            label={constant.screens.profile}
            icon={icons.profile}
            isFocused={selectedTab == constant.screens.profile}
            innerContainerStyle={profileTabFlex}
            outerContainerStyle={profileTabColor}
            onPress={()=>dispatch(setSelectedTab(constant.screens.profile))}
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
    backgroundColor: COLORS.primaryHeight,
    justifyContent: 'flex-end'
  }
})