
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
import { httpRequestGet, httpRequestPost } from '../actions';
import { authorURL, getarticleURL, httpHeaders, listarticleURL, postlistcommunityURL } from '../constants';
import { windowWidth } from '../styles';
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
const XFFlatList = ({ navigation, route, accountType, props, authorId, keyword, requestCode, initialPage = 1, pageSize = 15, refreshControlProps }) => {
  // 初始化 state

  const user = useSelector(state => state.auth.user);
  const [data, setData] = useState([])
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [nodata, setNodata] = useState(false);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  // 当 page 发生变化时，重新获取数据
  useEffect(() => {
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
      const newData = await httpRequestGet(`${listarticleURL}?authorId=${authorId != undefined ? authorId : 0}&keyword=${keyword != undefined ? keyword : ''}&communityId=${requestCode != undefined ? requestCode : 0}&pageSize=${pageSize}&pageNum=${page}`, httpHeaders);
      console.info(newData)
      if (newData.code = 1000) {

        if (newData.data == null) {
          // 如果返回的数据少于 pageSize，说明没有更多数据了
          setHasMoreData(false);
          setIsLoading(false)
          setNodata(true)
          Toast.showWithGravity(
            '没有更多数据了',
            Toast.SHORT,
            Toast.BOTTOM,
          );
          return emptyComponent
        }
        setData([...data, ...newData.data]);
        Toast.showWithGravity(
          '加载成功',
          Toast.SHORT,
          Toast.BOTTOM,
        );
      }

      setPage(page + 1);
      setIsLoading(false)
      console.info(newData)
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
    setPage(initialPage);
    setHasMoreData(false);

    try {
      const newData = await httpRequestGet(`${listarticleURL}?authorId=${authorId != undefined ? authorId : 0}&keyword=${keyword != undefined ? keyword : ''}&communityId=${requestCode != undefined ? requestCode : 0}&pageSize=${pageSize}&pageNum=${initialPage}`, httpHeaders);
      if (newData.code = 1000) {
        Toast.showWithGravity(
          '刷新成功',
          Toast.SHORT,
          Toast.BOTTOM,
        );
      }
      setData(newData.data);
    } catch (error) {
      console.log(error);
      Toast.showWithGravity(
        '刷新失败',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    }

    setIsRefreshing(false);
  };
  const emptyComponent = () => {
    return <View style={{
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{
        fontSize: 16
      }}>没有更多数据了</Text>
    </View>
  }
  // 自定义分割线
  const renderItemSeparatorComponent = ({ }) => (
    <View style={{ backgroundColor: '#f5f5f5', height: 10 }} />
  );
  const userData = async (author_id) => {
    try {
      const userData = await httpRequestGet(authorURL + author_id, httpHeaders);
      if (userData.code = 1000) {
        console.info(userData)
        setAvatar(userData.data.avatar)
        setName(userData.data.username)
      }

    } catch (error) {
      console.info(error)
    }
  }
  const _onLongPress=()=>{

  }
  // 渲染每个 item
  const renderItemWithIndex = ({ item, index }) => {
    let isOnePic = item._post.isimage
    // 判断是否是三图布局
    let isThreePic = item._post.isimage3
    // 判断是否是视频布局
    let isVideo = item._post.isvideo
    let author_id = item._post.author_id
    if (author_id != 0) {
      userData(author_id)
    }
    // console.info(item._post)
    if (isOnePic == 1) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('NewDetail', { id: item._post.id, community_id: item._post.community_id })}
          onLongPress={_onLongPress}
          delayLongPress={100}
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
          onPress={() => navigation.navigate('NewDetail', { id: item._post.id, community_id: item._post.community_id })}
          onLongPress={_onLongPress}
          delayLongPress={100}
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
          onPress={() => navigation.navigate('VideoDetail', { id: item._post.id, community_id: item._post.community_id })}
          onLongPress={_onLongPress}
          delayLongPress={100}
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
        onLongPress={_onLongPress}
        delayLongPress={100}
        activeOpacity={.8}
        onPress={() => navigation.navigate('NewDetail', { id: item._post.id, community_id: item._post.community_id })}
      >
        <View style={{ justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, lineHeight: 25, color: '#2c2c2c' }}>{item._post.title}</Text>
          <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between' }}>
            <View />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', }}>
              {item._post.news_source != '' ?
                <Text style={{ marginRight: 16 }}>{item._post.news_source}</Text>
                : <>
                 {avatar != '' ?
                    <Image
                        style={styles.userImg}
                        source={{ uri: BASEURL + avatar }}
                    /> :
                    <Image
                        style={styles.userImg}
                        source={require('../assets/images/users/default-avatar.png')}
                    />}
                  <Text style={{ marginRight: 16 }}>{name}</Text>
                </>
              }

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
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshData}
          // {...refreshControlProps}
          />
        }
        ListEmptyComponent={emptyComponent}
        onEndReachedThreshold={0.1}
        onEndReached={fetchData}
        getItemLayout={(data, index) => ({ length: 40, offset: (40 + 1) * index + 50, index })}
        ItemSeparatorComponent={renderItemSeparatorComponent}
        ListFooterComponent={isLoading ? (
          <View style={{
            height: 100,
            flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start',
          }}>
            <ActivityIndicator size="small" />
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                textAlignVertical: 'center',
              }}
            >
              加载中...
            </Text>
          </View>
        ) : (
          !hasMoreData && nodata ? emptyComponent : null
        )
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7
  },
  picItem: {
    padding: 7
  },
  userImg: {
    height: 20,
    width: 20,
    borderRadius: 75,
    marginRight: 16
},
});
export default XFFlatList;