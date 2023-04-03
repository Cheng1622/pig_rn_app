
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
import { httpHeaders, postlistcommunityURL } from '../constants';
import SweetAlert from 'react-native-sweet-alert';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { httpRequestGet } from '../../actions';
import WebView from 'react-native-webview';
import { windowWidth } from '../../styles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/';

const NewDetail = ({ navigation, route, accountType, props }) => {
    const { id } = route.params;
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState('')
    const [title, setTitle] = useState('')
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const newData = await httpRequestGet(`post/${id}`);
            setPost(newData.data._post.content);
            setTitle(newData.data._post.title);
            setLoading(false)
            console.info(newData.data._post.content)
        } catch (error) {
            console.log(error);
            Toast.showWithGravity(
                '加载失败',
                Toast.SHORT,
                Toast.BOTTOM,
            );
        }
    };

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
                        <div class='content'>${post}</div>
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
                    <TouchableOpacity  style={{ paddingLeft: 20, paddingRight: windowWidth / 8 }} >
                        <Ionicons name="heart" size={32} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity  style={{ paddingLeft: 20, paddingRight: windowWidth / 8 }}>
                        <Ionicons name="heart" size={32} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity  style={{ paddingLeft: 20, paddingRight: windowWidth / 8 }}>
                        <Ionicons name="heart" size={32} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity  style={{ paddingLeft: 20, paddingRight: windowWidth / 8 }}>
                        <Ionicons name="heart" size={32} color="black" />
                    </TouchableOpacity>
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
        height: 65,
        position: 'absolute',
        borderTopWidth: 1,
        borderColor: '#005DE3',
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'white'
    },
    bottomInner: {
        padding: 10,
        // paddingLeft: 100,
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },


});
export default NewDetail;