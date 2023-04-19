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
import {
  communityURL,
  httpHeaders
} from '../../constants';
import Toast from 'react-native-simple-toast';
import { connect, useSelector } from 'react-redux';
import { accountUrl, imageUrl, postUrl } from '../../constants';
import { ActivityIndicator } from 'react-native-paper';
import { getcommunity, removeUserData, signin } from '../../actions';
// import GetLocation from 'react-native-get-location';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'clwy-react-native-scrollable-tab-view';
import XFFlatList from '../../components/HomeFlatList.js'
import { windowWidth } from '../../styles';


export default function ({ navigation, route, accountType, props }) {
  const user = useSelector(state => state.auth.user);
  const [community, setCommunity] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    
  }, []);

  const tabArr = [
    { id: 58, community: "国内新闻" },
    { id: 263, community: "生猪期货" },
    { id: 147, community: "国际新闻" },
    { id: 148, community: "行业点评" },
    { id: 149, community: "原创分析" },
    { id: 70, community: "每日猪评" },
    { id: 118, community: "展会报道" },
    { id: 170, community: "种猪资讯" },
    { id: 166, community: "种猪行业新闻" },
    { id: 143, community: "种猪企业" },
    { id: 173, community: "种猪企业访谈" },
    { id: 221, community: "名企推荐" },
    { id: 31, community: "猪场建设" },
    { id: 32, community: "繁育管理" },
    { id: 91, community: "饲养管理" },
    { id: 35, community: "猪场管理" },
    { id: 233, community: "批次化生产" },
    { id: 261, community: "养猪大会" },
    { id: 81, community: "行情分析" },
    { id: 68, community: "玉米价格" },
    { id: 67, community: "豆粕价格" },
    { id: 257, community: "猪粮比" },
    { id: 256, community: "饲料供需" },
    { id: 267, community: "饲料分析" },
    { id: 63, community: "生猪价格" },
    { id: 64, community: "仔猪价格" },
    { id: 65, community: "猪肉价格" },
    { id: 115, community: "各省市猪价" },
    // { id: 90, community: "养猪新闻" },
    // { id: 88, community: "养猪技术" },
    // { id: 260, community: "每日猪价" },
    // { id: 92, community: "专家讲座" },
    // { id: 93, community: "人物访谈" },
    // { id: 94, community: "企业展示" },
    // { id: 111, community: "养猪致富" },

  ];

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.columnSelect}>
          <Ionicons
            name="menu"
            size={25}
          />
        </View>
        <ScrollableTabView
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar style={{ borderBottomWidth: 0, paddingBottom: 5, width: windowWidth * .9, height: 45 }} />}
          tabBarUnderlineStyle={{ height: 2, minWidth: Math.floor(windowWidth * .9 / 5), backgroundColor: '#2e64e5' }}
          tabBarInactiveTextColor="black"
          tabBarActiveTextColor="#2e64e5"
          tabBarTextStyle={{ fontSize: 15 }}
          onChangeTab={(ref) => { }}
          onScroll={(postion) => { }}
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
    backgroundColor: '#fff',
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


