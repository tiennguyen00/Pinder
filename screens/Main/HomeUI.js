import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Animated
} from 'react-native'
import { COLORS, FONTS, icons, SIZES, images } from '../../constants'
import MasonryList from '@react-native-seoul/masonry-list';
import { getNewPins } from '../../server/pixabay';
import { showLoading, hideLoading } from '../../redux/loading/loaddingActions';

const HEADER_MAX = 300;

export default function HomeUI(props) {
  const dispatch = useDispatch(); 
  const [dataFromApi, setDataFromApi] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function fetchData() {
      dispatch(showLoading());
      await getNewPins().then((value) => {
        setDataFromApi(value);
      });
      dispatch(hideLoading());
    }
    fetchData();
  }, [])


  const renderHeader = () => {
    return (
      <Animated.View
        style={{
          flex: scrollY.interpolate({
            inputRange: [0, HEADER_MAX],
            outputRange: [1, 0.5],
            extrapolate: 'clamp'
          }),
          backgroundColor: COLORS.white,
          borderBottomLeftRadius: 40,
          paddingHorizontal: 30,
          paddingTop: 20,
          zIndex: 100,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Animated.View 
            style={{
              opacity: scrollY.interpolate({
                inputRange: [0, HEADER_MAX],
                outputRange: [1, 0],
                extrapolate: 'clamp'
              }),
              
            }}
          >
            <Text style={{ ...FONTS.h1_bold, color: COLORS.primaryHeight }}>Hi, {props.userDetail.userName}!</Text>
            <Text style={{ ...FONTS.h4, color: COLORS.primaryHeight, marginTop: 10}}>How about is your day?</Text>
          </Animated.View>
          <Animated.Image
            source={images.profile_picture}
            resizeMode="cover"
            style={{
              width: scrollY.interpolate({
                inputRange: [0, HEADER_MAX],
                outputRange: [65, 50],
                extrapolate: 'clamp'
              }),
              height: scrollY.interpolate({
                inputRange: [0, HEADER_MAX],
                outputRange: [65, 50],
                extrapolate: 'clamp'
              }),
              borderRadius: 75,
            }}
          />
        </View>
        <Animated.View
          style={{
            position: 'relative',
            flexDirection: 'row',
            paddingRight: 50,
            paddingLeft: 10,
            backgroundColor: COLORS.gray,
            marginTop: scrollY.interpolate({
              inputRange: [0, HEADER_MAX],
              outputRange: ["5%", "-20%"],
              extrapolate: 'clamp'
            }),
            height: 50,
            borderRadius: 10,
            width: scrollY.interpolate({
              inputRange: [0, HEADER_MAX],
              outputRange: ['100%', '80%'],
              extrapolate: 'clamp'
            }),
            transform: [{ translateX: 5 } ]
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
        </Animated.View>
      </Animated.View>
    )
  }
  const renderContent = () => {


    const Card = (props) => {
      const { item } = props;
      const randomBool = useMemo(() =>  item.id%2==0, [])

      return (
        <Animated.View
          key={item.id}
          style={{
            flex: 1,
            marginHorizontal: 5,
            height: randomBool ? 150 : 280,
            marginVertical: 10
            // scrollY.interpolate({
            //     inputRange: [0, 1000],
            //     outputRange: [10, 50],
            //     extrapolate: 'clamp'
            //   })
          }}
        >
          <Image
            source={{ uri: item.urls }}
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
              <Text style={{ ...FONTS.h4, color: COLORS.black, marginLeft: 3, fontWeight: "600" }} >{item.likes}</Text>
            </View>
          </View>

        </Animated.View>
      )

    }

    return (
      <View
        style={{
          flex: 5,
          paddingVertical: 10,
        }}
      >
        <Animated.ScrollView
          style={{
            width: '100%',
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
        >
          <MasonryList
            style={{ alignSelf: 'stretch' }}
            keyExtractor={index => console.log(index)}
            contentContainerStyle={{
              paddingHorizontal: 10,
              alignSelf: 'stretch',
            }}
            numColumns={2}
            data={dataFromApi}
            renderItem={(item) => <Card key={item.item.id} item={item.item} />}
          />
        </Animated.ScrollView>
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
