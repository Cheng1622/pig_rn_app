
import React, { useState, useEffect } from 'react';
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
    StatusBar,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    TouchableWithoutFeedback
} from 'react-native';
import Video from "react-native-video";
import Toast from 'react-native-simple-toast';
import { useSelector } from 'react-redux';
import { httpRequestGet, httpRequestPost } from '../../actions';
import { BASEURL, authorURL, getarticleURL, httpHeaders, likeURL, listarticleURL, postarticleURL, postlistcommunityURL, videoarticleURL } from '../../constants';
import { windowHeight, windowWidth } from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';


const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const VideoDetail = ({ navigation, route, initialPage = 1, pageSize = 5, refreshControlProps }) => {
    // 初始化 state
    const { id } = route.params;
    const { community_id } = route.params;
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    const [data, setData] = useState([])
    const [page, setPage] = useState(initialPage);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [nodata, setNodata] = useState(false);
    const [isPause, setIsPause] = useState(false);
    const [current, setCurrent] = useState(0);
    const [likecolor, setLikecolor] = useState('white');

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    // 当 page 发生变化时，重新获取数据
    useEffect(() => {
        // fetchData();
        getData()
    }, []);
    const getData = async () => {
        try {

            setIsLoading(true);
            const newData = await httpRequestGet(getarticleURL + id, httpHeaders);
            setData([newData.data]);
            console.info(newData)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            Toast.showWithGravity(
                '加载失败',
                Toast.SHORT,
                Toast.BOTTOM, 
            );
        }
    };
console.info(data)
    // 获取数据
    const fetchData = async () => {
        // 判断是否需要分页获取
        if (!hasMoreData || isLoading) {
            return;
        }

        setIsLoading(true);
        try {
            const newData = await httpRequestGet(`${listarticleURL}?communityId=${community_id != undefined ? community_id : 0}&pageSize=${pageSize}&pageNum=${page}`, httpHeaders);
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
            const newData = await httpRequestGet(`${listarticleURL}?communityId=${community_id != undefined ? community_id : 0}&pageSize=${pageSize}&pageNum=${initialPage}`, httpHeaders);
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
    const getLike = async (post_id) => {

        try {
            const params = {
                post_id: post_id,
                direction: "1",
            };
            const header = {
                'auth-token': token,
            };
            const likeData = await httpRequestPost(likeURL, params, header)
            if (likeData.code == 1000) {
                setLikecolor("red");
            }
        } catch (error) {
            console.log(error);
            Toast.showWithGravity(
                '加载失败',
                Toast.SHORT,
                Toast.BOTTOM,
            );
        }
    }

    // 渲染每个 item
    const renderItemWithIndex = ({ item, index }) => {
        console.info(item._post.video)
        return (
            <View style={styles.container}>

                <TouchableOpacity
                    onPress={() => {
                        setIsPause(!isPause);
                    }}
                >
                    <Video
                        source={{ uri: BASEURL + videoarticleURL + item._post.video }}
                        // source={{ uri: `${BASEURL}video/${item._post.video}` }}
                        resizeMode={'contain'}
                        posterResizeMode="cover"
                        poster={item._post.videoimage}
                        // controls={true}
                        paused={index === current ? isPause : true}
                        // paused={true}
                        style={styles.backgroundVideo}
                    />

                </TouchableOpacity>
                <View style={{ position: 'absolute', bottom: 0, flex: 1 }}>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 18,
                        marginBottom: 20,
                        alignItems: 'center',
                    }}>
                        <View
                            style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: '#FFF' }}
                        />
                        <Text style={{ color: '#FFF', fontSize: 14, marginLeft: 4 }}>
                            <Text style={styles.tagtitle}>{item._post.news_source}</Text>
                        </Text>
                    </View>
                    <View
                        style={{ height: 1, marginTop: 12, backgroundColor: '#FFF', width: windowWidth }}
                    />
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 18,
                        marginBottom: 20,
                        marginLeft: 10,
                        marginRight: 10,
                        alignItems: 'center',
                    }}>
                        <Text
                            style={{
                                color: '#FFF',
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}
                        >
                            {item._post.title}
                        </Text>
                    </View>
                </View>
                <View style={{
                    position: 'absolute',
                    right: 20,
                    bottom: 165,
                }}>
                    <TouchableWithoutFeedback onPress={getLike(item._post.id)}  >
                        <Ionicons name="heart" size={40} color={likecolor} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback >
                        <Ionicons name="chatbubble-ellipses" size={40} color="white" />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback >
                        <Ionicons name="star" size={40} color="white" />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback >
                        <Ionicons name="arrow-redo-sharp" size={40} color="white" />
                    </TouchableWithoutFeedback>
                </View>

                {
                    isPause ?
                        <View style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }} >
                            <TouchableOpacity onPress={() => {
                                setIsPause(!isPause);
                            }}>
                                <Ionicons name="caret-forward-circle-outline" resizeMode={'contain'} size={70} color="white" />
                            </TouchableOpacity>
                        </View>
                        : null
                }
            </View>
        );
    };

    const _onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
        if (viewableItems?.length === 1) {
            setCurrent(viewableItems[0].index);
        }
    }, []);
    const VIEWABILITY_CONFIG = {
        viewAreaCoveragePercentThreshold: 40,//item滑动80%部分才会到下一个
        minimumViewTime: 300,
        waitForInteraction: true
    };
    // 渲染 FlatList
    return (
        <SafeAreaView style={{
            display: 'flex',
            flexDirection: 'column',
            height: windowHeight,
        }}>
            <StatusBar
                backgroundColor="transparent"
                translucent
            />
            <FlatList
                data={data}
                renderItem={renderItemWithIndex}
                keyExtractor={(item, index) => index.toString()}
                pagingEnabled={true} // 一次滑动一屏
                viewabilityConfig={VIEWABILITY_CONFIG}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={refreshData}
                    />
                }
                ListEmptyComponent={emptyComponent}
                onMoveShouldSetResponder={() => true}
                onEndReached={fetchData}
                getItemLayout={(item, index) => {
                    return { length: windowHeight, offset: windowHeight * index, index };
                }}
                ItemSeparatorComponent={_onViewableItemsChanged}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
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
    btn: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flex: 1,
        alignItems: 'center',
    },
    item: {
        height: windowHeight, // 高度等于屏幕的高度
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: {
        height: windowHeight, // 高度等于屏幕的高度
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        height: windowHeight,
        width: windowWidth,
        backgroundColor: "#000"
    },
    full: {
        flex: 1,
        flexDirection: 'row'
    },
    rightside: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        margin: 8
    },
    leftside: {
        alignItems: 'flex-start'
    },
    rightcontent: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    likecount: {
        color: 'white',
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    },
    commentcount: {
        color: 'white',
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    },
    share: {
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagtitle: {

        padding: 10,
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold'

    },
    tag: {
        backgroundColor: '#f20b3a',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: windowWidth / 2
    },
    username: {
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 8,
        width: windowWidth - 100
    },
    commentsBottom: {
        color: 'white',
        marginLeft: 8
    },
    userimage: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2
    },
    backgroundVideo: {
        position: 'absolute',
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'black',

    },

});
export default VideoDetail;