import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { getNewPins, getFromApi } from '../../server/pixabay';
import { showLoading, hideLoading } from '../../redux/loading/loaddingActions';
import { uploadImage } from '../../redux';

const HEADER_MAX = 300;
const height1 = 150, height2 = 280;

export default function HomeUI(props) {
  const dispatch = useDispatch(); 
  const dataFromApi = useSelector(state => state.pinsReducer.data);
  const scrollY = useRef(new Animated.Value(0)).current;
  const marginVerAnimation = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    async function fetchData() {
      dispatch(showLoading());
      await getNewPins().then((value) => {
        dispatch(uploadImage(value));
      });
      dispatch(hideLoading());
    }
    fetchData();
  }, [])


  const renderHeader = () => {
    const handleSearch = async (e) => {
      let newPins = [];
      await getFromApi(e).then((res) => {
        let results = res.map((img) => {
          return { 
            urls: img.urls,
            id: img.id,
            likes: img.likes,
            user: img.user,
            views: img.views, 
            imageHeight: img.imageHeight,
            imageWidth: img.imageWidth,
            userImageURL: img.userImageURL
          };
        });

        newPins = [...results];
        newPins.sort(() => {
          return 0.5 - Math.random();
        });
      });

      dispatch(uploadImage(newPins));
    }

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
            onEndEditing={(e) => handleSearch(e.nativeEvent.text)}
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
      const { item, index } = props;
      const randomBool = useMemo(() =>  item.id%2==0, [])
      // console.log(props.key);
   
      return (
        <Animated.View
          key={index}
          style={{
            flex: 1,
            marginHorizontal: 5,
            height: randomBool ? height1 : height2,
            marginVertical: scrollY.interpolate({
              inputRange: [0, (index+1)*height2, (index+1)*height2 + height1],
              outputRange: [10, 30, 10],
              extrapolate: 'clamp'
            })
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
          contentContainerStyle={{ paddingBottom: 60 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
        >
          <MasonryList
            style={{ alignSelf: 'stretch' }}
            contentContainerStyle={{
              paddingHorizontal: 10,
              alignSelf: 'stretch',
            }}
            numColumns={2}
            data={dataFromApi}
            renderItem={({ item, i }) => <Card index={i} key={item.id}  item={item} />}
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
