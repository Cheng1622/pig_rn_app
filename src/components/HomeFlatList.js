
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { useSelector } from 'react-redux';
import { httpRequestGet } from '../actions';
import { httpHeaders, postlistcommunityURL } from '../constants';
import { windowWidth } from '../styles';
import SweetAlert from 'react-native-sweet-alert';
import Ionicons from 'react-native-vector-icons/Ionicons';


/**
 * props:
 *   renderItem: (item: T, index: number) => React.ReactNode
 *   keyExtractor: (item: T, index: number) => string
 *   data: T[]
 *   onFetchData: (page: number) => Promise<T[]>
 *   initialPage: number
 *   pageSize: number
 *   refreshControlProps?: RefreshControlProps
 */
const XFFlatList = ({ navigation, route, accountType, props, requestCode, initialPage = 1, pageSize = 15, refreshControlProps }) => {
  // 初始化 state
  const user = useSelector(state => state.auth.user);
  const [data, setData] = useState([])
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  // 当 page 发生变化时，重新获取数据
  useEffect(() => {
    if (Object.keys(user).length == 0) {
      SweetAlert.showAlertWithOptions({
        style: 'error',
        title: '很抱歉，您的帐户数据已被删除。请再次登录',
      });
      navigation.replace('SignIn');
    }
    fetchData();
  }, [page]);

  // 获取数据
  const fetchData = async () => {
    // 判断是否需要分页获取
    if (!hasMoreData || isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const newData = await httpRequestGet(`postlistcommunity?community=${requestCode}&pageSize=${pageSize}&pageNum=${page}`);
      if (newData.code != 1000) {
        return
      }
      console.info(page)

      if (newData.data == null) {
        // 如果返回的数据少于 pageSize，说明没有更多数据了
        setHasMoreData(false);
        Toast.showWithGravity(
          '没有更多数据了',
          Toast.SHORT,
          Toast.BOTTOM,
        );
        return
      }
      setData([...data, ...newData.data]);
      // console.info(newData.data)
    } catch (error) {
      console.log(error);
      Toast.showWithGravity(
        '加载失败',
        Toast.SHORT,
        Toast.BOTTOM,
    );
    }
  };

  // 刷新数据
  const refreshData = async () => {
    if (isRefreshing) {
      return;
    }

    setIsRefreshing(true);
    setPage(initialPage + 1);
    setHasMoreData(true);

    try {
      const newData = await httpRequestGet(`postlistcommunity?community=${requestCode}&pageSize=${pageSize}&pageNum=${initialPage}`);
      if (newData.code = 1000) {
        Toast.showWithGravity(
          '加载成功',
          Toast.SHORT,
          Toast.BOTTOM,
        );
      }
      setData(newData.data);
    } catch (error) {
      console.log(error);
      Toast.showWithGravity(
        '加载失败',
        Toast.SHORT,
        Toast.BOTTOM,
    );
    }

    setIsRefreshing(false);
  };

  // 自定义分割线
  const renderItemSeparatorComponent = ({ }) => (
    <View style={{ height: 1, backgroundColor: '#e6e6e6' }} />
  );

  // 渲染每个 item
  const renderItemWithIndex = ({ item, index }) => {
    let isOnePic = item._post.isimage
    // 判断是否是三图布局
    let isThreePic = item._post.isimage3
    // 判断是否是视频布局
    let isVideo = item._post.isvideo

    // console.info(item._post)
    if (isOnePic == 1) {
      return (
        <TouchableOpacity
        onPress={() => navigation.navigate('NewDetail',{id:item._post.id})}
          style={styles.item}
          activeOpacity={.8}>
          <View style={{ width: windowWidth * .63, height: 120, justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, lineHeight: 25, color: '#2c2c2c' }}>{item._post.title}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', }}>
                {/* <Text style={{ marginRight: 16 }}>{item.Source}</Text> */}
                <Text style={{ marginRight: 16 }}>{item._post.news_source}</Text>
                {/* <Text>{item.replyCount}跟帖</Text> */}
              </View>
              {/* <Text style={{ color: '#ccc', fontSize: 18 }}>x</Text> */}
            </View>
          </View>
          <Image source={{ uri: item._post.image1 }} style={{ width: windowWidth * .4, height: 90 }} />
        </TouchableOpacity>



      );
    }

    if (isThreePic == 1) {
      let images = [
        { image: item._post.image1 },
        { image: item._post.image2 },
        { image: item._post.image3 },
      ]
      return (
        <TouchableOpacity
        onPress={() => navigation.navigate('NewDetail',{id:item._post.id})}
          style={styles.picItem}
          activeOpacity={.8}>
          <View style={{ justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, lineHeight: 25, color: '#2c2c2c' }}>{item._post.title}</Text>

            <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between' }}>
              <View />
              {
                images.map((imgItem, index) => (
                  <Image source={{ uri: imgItem.image }} key={index + ''} style={{ width: windowWidth * .32, height: 80, borderRadius: 2 }} />
                )
                )
              }

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', }}>
              <Text style={{ marginRight: 16 }}>{item._post.news_source}</Text>
                {/* <Text style={{ marginRight: 6 }}>{item.replyCount}跟帖</Text> */}
              </View>
              {/* <Text style={{ color: '#ccc', fontSize: 18 }}>x</Text> */}
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    if (isVideo == 1) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('VideoDetail',{id:item._post.id})}
          style={styles.picItem}
          activeOpacity={.8}
        >
          <View style={{ justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, lineHeight: 25, color: '#2c2c2c' }}>{item._post.title}</Text>
            <ImageBackground source={{ uri: item._post.videoimage }} resizeMode={'cover'} style={{ height: 180, marginVertical: 6, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(0,0,0,.5)', justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="play" resizeMode={'contain'} size={28} color="white" />
              </View>
            </ImageBackground>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', }}>
                <Text style={{ marginRight: 16 }}>{item._post.news_source}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return (

      <TouchableOpacity
        style={styles.picItem}
        activeOpacity={.8}
        onPress={() => navigation.navigate('NewDetail',{id:item._post.id})}
      >
        <View style={{ justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, lineHeight: 25, color: '#2c2c2c' }}>{item._post.title}</Text>
          <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between' }}>
            <View />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', }}>
              <Text style={{ marginRight: 16 }}>{item._post.news_source}</Text>
              {/* <Text style={{ marginRight: 6 }}>{item.replyCount}跟帖</Text> */}
            </View>
          </View>
        </View>

      </TouchableOpacity>
    );

  };


  // 渲染 FlatList
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItemWithIndex}
        // keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshData}
          // {...refreshControlProps}
          />
        }
        onEndReachedThreshold={0.1}
        onEndReached={fetchData}
        getItemLayout={(data, index) => ({ length: 40, offset: (40 + 1) * index + 50, index })}
        ItemSeparatorComponent={renderItemSeparatorComponent}
        ListFooterComponent={isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          !hasMoreData && (
            <View>
              {!data.length ? noDataComponent : null}
            </View>
          )
        )
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7
  },
  picItem: {
    padding: 7
  }
});
export default XFFlatList;