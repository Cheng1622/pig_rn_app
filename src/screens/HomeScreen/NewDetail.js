
import React, { useState, useEffect, version } from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { httpRequestGet } from '../../actions';
import WebView from 'react-native-webview';
import { windowWidth } from '../../styles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/';
import { postarticleURL, getarticleURL, authorURL, BASEURL, httpHeaders } from '../../constants';
import CoverLayer from '../../components/CoverLayer';

const NewDetail = ({ navigation, route, accountType, props }) => {
    const { id } = route.params;
    const { author_id } = route.params;
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState()
    const [title, setTitle] = useState('')
    const [like, setLike] = useState(false)
    const [nolike, setNolike] = useState(false)
    const [star, setStar] = useState(false)

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        getData()

    }, [])

    const getData = async () => {
        try {
            const newData = await httpRequestGet(getarticleURL + id, httpHeaders);
            setPost(newData.data._post);
            setTitle(newData.data._post.title);
            setName(newData.data._post.news_source)
            setLoading(false)
            if (newData.data._post.author_id != 0) {
                userData(newData.data._post.author_id)
            }
        } catch (error) {
            console.log(error);
            Toast.showWithGravity(
                '加载失败',
                Toast.SHORT,
                Toast.BOTTOM,
            );
        }
    };
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
    console.info(post)
    return (
        <View style={styles.container}>
            {loading ? <Text>加载中---</Text> : <WebView
                source={{
                    html: `
                        <style>
                        p:nth-child(1){
                            font-weight:bold;
                            font-size:4rem;
                            padding:2rem 0;
                        }
                        span:nth-child(0){
                            font-weight:bold;
                            font-size:3rem;
                            padding-top:2rem;
                            padding-bottom:0.1rem;
                        }
                        .aa1{
                            font-weight:bold;
                            font-size:2rem;
                            padding-bottom:5rem;
                        }
                        p:nth-child(3){
                            font-size:2rem;
                            padding-bottom:2rem
                        }
                        img{
                            width:100%
                        }
                        span,tr{
                            font-size:3rem;
                        }
                        a{ 
                            text-decoration:none;
                            color:black
                        }
                        .content{
                            font-size:3rem;

                        }
                        .tabzj{
                            width: 100%;
                        }
                        .tabzj thead th {
                            background: #2e64e5;
                            border: 1px solid #333;
                            font-weight: normal;
                            color:white
                        }
                        .tabzj tbody td{
                            border: 1px solid #333;
                        }
                        </style>
                        <p>${title}</p>
                        <div class="aa1">
                        <span>${name}<span></br>
                        <span style="color:grey;font-size:28px;">发布于 ${post.news_time}</span>
                        </div>
                        <div class='content'>${post.content}</div>
                        <br><br><br><br><br><br>
                        <br><br><br><br><br><br>
                        ` }}
                javaScriptEnabled={true}
                setBuiltInZoomControls={false}
                domStorageEnabled={true}
                scrollEnabled={false}
                automaticallyAdjustContentInsets={true}
                // onMessage={this.onMessage.bind(this)}
                style={{
                    marginLeft: 16,
                    marginRight: 16,
                }}
                showsVerticalScrollIndicator={false}
                textZoom={100}
            />}
            {/* {renderBottom} */}


            <View style={styles.bottomWrap}>
                <View style={styles.bottomInner}>
                    {/* <TouchableOpacity style={{ paddingLeft: 20, paddingRight: windowWidth / 8 }} >
                        {like ? <Ionicons name="heart" size={20} color="red" /> : <Ionicons name="heart-outline" size={20} color="black" />}
                    </TouchableOpacity>
                    <CoverLayer
                        ref={ref => CoverLayer.current = ref}
                        renderContent={() => {
                            return (
                                <View style={{ width: 100, height: 100, background: 'red' }} />
                            )
                        }}
                        coverLayerEvent={() => {
                            console.log('点击背景')
                            CoverLayer.current && CoverLayer.current.hide && CoverLayer.current.hide()
                        }}
                        coverLayerColor="rgba(0,0,0,0.2)"
                    />
                    <TouchableOpacity style={{ paddingLeft: 20, paddingRight: windowWidth / 8 }}>
                        {nolike ? <Ionicons name="heart-dislike-sharp" size={20} color="black" /> : <Ionicons name="heart-dislike-outline" size={20} color="black" />}
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingLeft: 20, paddingRight: windowWidth / 8 }} onPress={() => { coverLayerEvent && coverLayerEvent() }}>
                        {star ? <Ionicons name="star" size={20} color="black" /> : <Ionicons name="star-outline" size={20} color="black" />}
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingLeft: 20, paddingRight: windowWidth / 8 }}>
                        <Ionicons name="share" size={20} color="black" />
                    </TouchableOpacity> */}
                    <View style={styles.userInfoWrapper}>
                        <View style={styles.userInfoItem}>
                            {like ? <Ionicons name="heart" size={20} color="red" style={styles.userInfoTitle} /> : <Ionicons name="heart-outline" size={20} color="black" style={styles.userInfoTitle} />}

                            <Text style={styles.userInfoSubTitle}>点赞</Text>
                        </View>

                        <View style={styles.userInfoItem}>
                            {nolike ? <Ionicons name="heart-dislike-sharp" size={20} color="black" style={styles.userInfoTitle} /> : <Ionicons name="heart-dislike-outline" size={20} color="black" style={styles.userInfoTitle} />}
                            <Text style={styles.userInfoSubTitle}>踩赞</Text>
                        </View>
                        <View style={styles.userInfoItem}>
                            {star ? <Ionicons name="star" size={20} color="yellow" style={styles.userInfoTitle} /> : <Ionicons name="star-outline" size={20} color="black" style={styles.userInfoTitle} />}
                            <Text style={styles.userInfoSubTitle}>收藏</Text>
                        </View>
                        <View style={styles.userInfoItem}>
                            {/* <Text style={styles.userInfoTitle}>{user.userdata?.fan}</Text> */}

                            <Ionicons name="chatbubble-ellipses" size={20} color="black" />
                            <Text style={styles.userInfoSubTitle}>评论</Text>
                        </View>
                        <View style={styles.userInfoItem}>
                            <Ionicons name="share" size={20} color="black" style={styles.userInfoTitle} />
                            <Text style={styles.userInfoSubTitle}>分享</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({

    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#ffffff'
    },
    bottomWrap: {
        height: 45,
        position: 'absolute',
        borderTopWidth: 1,
        borderColor: '#005DE3',
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'white'
    },
    bottomInner: {
        // paddingLeft: 100,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        // marginVertical: 20,
    },
    userInfoItem: {
        justifyContent: 'center',
    },
    userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        // marginBottom: 5,
        textAlign: 'center',
    },
    userInfoSubTitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },

});
export default NewDetail;