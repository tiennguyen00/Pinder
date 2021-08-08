import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
  View, 
  Text,
  TextInput,
  Image,
  ScrollView,
  CardItem
}from 'react-native'
import { COLORS, FONTS, icons, SIZES, images } from '../../constants'
import MasonryList from '@react-native-seoul/masonry-list';
import { getNewPins } from '../../server/pixabay';
import Card from '../../components/Card';
import { showLoading, hideLoading } from '../../redux/loading/loaddingActions';
import { func } from 'prop-types';

export default function HomeUI(props) {


  const renderHeader = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          borderBottomLeftRadius: 40,
          paddingHorizontal: 30,
          paddingTop: 20,
          zIndex: 100
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
            marginTop: "5%",
            height: 50,
            borderRadius: 10, 
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
    const dispatch = useDispatch();
    const [dataFromApi, setDataFromApi] = useState([]);

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

    const renderItem = (item) => {
      return (
        <Card key={item.item.id.toString()} item={item.item}/>
      )
    }

    return (
      <View
        style={{
          flex: 5,
          paddingTop: 30,
        }}
      >
        <ScrollView
          style={{
            width: '100%',
          }}
        >
          <MasonryList
            style={{alignSelf: 'stretch'}}
            contentContainerStyle={{
                paddingHorizontal: 10,
                alignSelf: 'stretch',
              }}
            numColumns={2}
            data={dataFromApi}
            renderItem={renderItem}
          />
        </ScrollView>
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
