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
    TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import SweetAlert from 'react-native-sweet-alert';
import Toast from 'react-native-simple-toast';
import { connect, useSelector } from 'react-redux';
import { calcTime, ConvertToUrlForm, httpHeaders } from '../../util';
import { accountUrl, imageUrl, postUrl } from '../../constants';
import { ActivityIndicator } from 'react-native-paper';
import { removeUserData } from '../../actions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default function ({ navigation, route, accountType }) {
    const userData = useSelector(state => state.auth);
    useEffect(() => {
        // if (Object.keys(userData).length == 0){
        //     SweetAlert.showAlertWithOptions({
        //         style: 'error',
        //         title: '很抱歉，您的帐户数据已被删除。请再次登录',
        //     });
        //     navigation.navigate('SignIn');
        // }
        console.info(userData)
    }, []);
    
    const logout = () => {
        removeUserData();
        navigation.replace('Auth');
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                showsVerticalScrollIndicator={false}>
                {<Image
                    style={styles.userImg}
                    source={require('../../assets/images/users/default-avatar.png')}
                />}
                {/* <Text style={styles.userName}>{userData.Username = '' ? userData.Username : "猪智通用户"}</Text>
                <Text style={styles.userName}>{userData.Username != '' ? userData.data.Username : "猪智通用户"}</Text>
                <Text style={styles.userName}>{userData.Username != '' ? userData.Username : "猪智通用户"}</Text>
                <Text style={styles.userName}>{userData.Username != '' ? userData.Username : "猪智通用户"}</Text>
                <Text style={styles.userName}>{userData.Username != '' ? userData.Username : "猪智通用户"}</Text>
                <Text style={styles.userName}>{userData.Username != '' ? userData.Username : "猪智通用户"}</Text> */}
                {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
                <Text style={styles.aboutUser}>
                    {userData.Username}
                </Text>
                {/* <View style={styles.userBtnWrapper}>
                    {route.params ? (
                        <>
                            <TouchableOpacity style={styles.userBtn} onPress={() => { }}>
                                <Text style={styles.userBtnTxt}>Message</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.userBtn} onPress={() => { }}>
                                <Text style={styles.userBtnTxt}>Follow</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => {
                                    navigation.navigate('EditProfile');
                                }}>
                                <Text style={styles.userBtnTxt}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
                                <Text style={styles.userBtnTxt}>Logout</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View> */}

                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoItem}>
                        {/* <Text style={styles.userInfoTitle}>{posts.length}</Text> */}
                        {/* <Text style={styles.userInfoSubTitle}>文章111</Text> */}
                    </View>
                    <View style={styles.userInfoItem}>
                        {/* <Text style={styles.userInfoTitle}>10,000</Text> */}
                        <Text style={styles.userInfoSubTitle}>点赞</Text>
                    </View>
                    <View style={styles.userInfoItem}>
                        {/* <Text style={styles.userInfoTitle}>100</Text> */}
                        <Text style={styles.userInfoSubTitle}>收藏</Text>
                    </View>
                </View>

                {/* {posts.map((item) => (
              <PostCard key={item.id} item={item} onDelete={handleDelete} />
            ))} */}
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: 'black'
    },
    aboutUser: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    },
    userBtnTxt: {
        color: '#2e64e5',
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
    },
    userInfoItem: {
        justifyContent: 'center',
    },
    userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    userInfoSubTitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});