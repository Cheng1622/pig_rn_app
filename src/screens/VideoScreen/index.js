import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Pressable,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import Toast from 'react-native-simple-toast';
import { connect, useSelector } from 'react-redux';
import { calcTime, ConvertToUrlForm, httpHeaders } from '../../util';
import { accountUrl, imageUrl, postUrl } from '../../constants';
import { ActivityIndicator } from 'react-native-paper';
import { removeUserData } from '../../actions';
// import GetLocation from 'react-native-get-location';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'clwy-react-native-scrollable-tab-view';
import XFFlatList from '../../components/HomeFlatList.js'
import { windowWidth } from '../../styles';


// const { width, height } = Dimensions.get('screen');

// let deviceHeight = Dimensions.get('screen').height;
// let windowHeight = Dimensions.get('window').height;
// let bottomNavBarHeight = deviceHeight - windowHeight;

// if (bottomNavBarHeight < 0 && Platform.OS === 'ios') bottomNavBarHeight = 0;

// let like_num;
// let bookmark_num;

export default function ({ navigation, route, accountType, props }) {
  const user = useSelector(state => state.auth.user);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
 
    // GetCommunitys();
  }, []);
  // const GetCommunitys = async () => {
  //   console.info(communityURL)
  //   fetch(communityURL, {
  //     method: 'get',
  //     headers: httpHeaders,
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res.data);
  //       if (res.code == 1000) {
  //         setCommunity(res.data);
  //       } else {
  //         Toast.show({
  //           type: 'error',
  //           text1: '加载失败，请刷新'
  //         });
  //       }
  //     });
  // };
  const  tabArr = [
    { id: 90,community:'养猪新闻'},
    { id: 88,community:'养猪技术'},
    { id: 260,community:'每日猪价'},
    { id: 92,community:'专家讲座'},
    { id: 93,community:'人物访谈'},
    { id: 94,community:'企业展示'},
    { id: 111,community:'养猪致富'},
];


  return (
    <View style={styles.container}>

      {/* 栏目条 */}
      <View style={styles.container}>

        <View style={styles.columnSelect}>
          <Ionicons
            name="menu"
            size={25}
          />
        </View>
        <ScrollableTabView
          renderTabBar={() => <ScrollableTabBar style={{ borderBottomWidth: 0, paddingBottom: 5, width: windowWidth * .9, height: 45 }} />}
          tabBarUnderlineStyle={{ height: 2, minWidth: Math.floor(windowWidth * .9 / 5), backgroundColor: '#2e64e5' }}
          tabBarInactiveTextColor="black"
          tabBarActiveTextColor="#2e64e5"
          tabBarTextStyle={{ fontSize: 15 }}
          onChangeTab={(ref) => { }}
          onScroll={(postion) => { }}
          // locked={false}
          initialPage={0}
        >

          {
            tabArr.map(item => {
              return (
                <XFFlatList
                  key={item.id}
                  tabLabel={item.community}
                  requestCode={item.id}
                  navigation={navigation}
                />
              )
            })
          }

        </ScrollableTabView>

      </View>


    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'Blue',
    position: 'relative'
  },
  swiperItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  columnSelect: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: windowWidth * .1,
    height: 50,
    top: 0,
    right: 0,
    /*shadowColor:'red',
    shadowOffset:{h:-10,w:-10},
    shadowRadius:3,
    shadowOpacity:1,*/
  }


});