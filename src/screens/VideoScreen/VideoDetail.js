import React, { useEffect, useState } from 'react';
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
    FlatList
} from 'react-native';
// import Header from '../components/Header'
import Video from "react-native-video";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import { useSelector } from 'react-redux';
import { httpRequestGet } from '../../actions';


const VideoDetail = ({ navigation, route, accountType, props }) => {
    const { id } = route.params;
    const user = useSelector(state => state.auth.user);
    const [data, setData] = useState([]);
    const [video, setVideo] = useState('');
    const [title, setTitle] = useState('');
    const [like, setLike] = useState(false);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const newData = await httpRequestGet(`post/${id}`);
            setData(newData.data)
            setVideo(newData.data._post.video);
            setTitle(newData.data._post.title);
            setLoading(false)
        } catch (error) {
            console.log(error);
            Toast.showWithGravity(
                '加载失败',
                Toast.SHORT,
                Toast.BOTTOM,
            );
        }
    };
    const VIEWABILITY_CONFIG = {
        viewAreaCoveragePercentThreshold: 40,//item滑动80%部分才会到下一个
        minimumViewTime: 300,
        waitForInteraction: true
      };
    return (
        <View>
            {loading ? <Text>加载中</Text> :
                <View >
                    <StatusBar
                        backgroundColor="transparent"
                        translucent
                    />
                    <FlatList
                        data={ data}
                        renderItem={this._renderItem}
                        onEndReached={this._onEndReached}
                        pagingEnabled={true} // 一次滑动一屏
                        getItemLayout={(data, index) => {
                            return { length: screenHeight, offset: screenHeight * index, index }
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        viewabilityConfig={VIEWABILITY_CONFIG}
                        ListFooterComponent={this._renderFooter}
                        extraData={this.state.selected}
                        refreshing={this.state.refreshing}
                        onRefresh={this._renderRefresh}
                        // 是一个可选的优化，用于避免动态测量内容；+50是加上Header的高度
                        onViewableItemsChanged={this._onViewableItemsChanged}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                    />
                    <View style={{ position: 'absolute', width: windowWidth }}>


                        <View row style={{ justifyContent: 'space-between', width: windowWidth, height: 80, padding: 25 }} >
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.goBack();
                            }}>
                                <Ionicons name="arrow-back-outline" size={32} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}
export default VideoDetail;

