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
import { useDispatch, useSelector } from 'react-redux';
import { httpRequestGet } from '../../actions';
import { BASEURL, collectsURL, followURL, httpHeaders, listarticleURL, LOGIN_SUCCESS, userURL } from '../../constants';
import XFFlatList from '../../components/HomeFlatList';
import { windowHeight } from '../../styles';

export default function ({ navigation }) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    const [collect, setCollect] = useState([]);
    const [follow, setFollow] = useState([]);
    const [act, setAct] = useState([]);
    const [fan, setFan] = useState(0);

    useEffect(() => {
        getData()
        getcollect(dispatch, token)
        getfollow(dispatch, token)
    }, [user]);

    const getcollect = async (dispatch, token) => {
        try {
            const httpHeaders = {
                'auth-token': token.data,
            };
            const res = await httpRequestGet(`${collectsURL}?userId=${user.userdata?.user_id}`, httpHeaders)
            console.info(res)
            if (res.code == 1000) {
                const coll = res.data;
                setCollect(coll)
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getfollow = async (dispatch, token) => {
        try {
            const httpHeaders = {
                'auth-token': token.data,
            };
            const res = await httpRequestGet(`${followURL}?userId2=${user.userdata?.user_id}`, httpHeaders)
            console.info(res)
            if (res.code == 1000) {
                const coll = res.data;
                setFollow(coll)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getData = async () => {
        try {
            const res = await httpRequestGet(`${listarticleURL}?authorId=${user.userdata.user_id}`, httpHeaders);
            console.info(user.userdata.user_id)
            if (res.code == 1000) {
                const coll = res.data;
                setAct(coll)
            }
        } catch (error) {
            console.log(error);

        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ height: 300 }}>
                <ScrollView
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    showsVerticalScrollIndicator={false}
                >
                    {user.userdata?.avatar != '' ?
                        <Image
                            style={styles.userImg}
                            source={{ uri: BASEURL + user.userdata?.avatar }}
                        /> :
                        <Image
                            style={styles.userImg}
                            source={require('../../assets/images/users/default-avatar.png')}
                        />}
                    <Text style={styles.userName}>
                        {user.userdata?.username != '' ? user.userdata?.username : '慧养猪用户'}
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
                            <Text style={styles.userInfoTitle}>{act != null ? Object.keys(act).length : 0}</Text>
                            <Text style={styles.userInfoSubTitle}>文章</Text>
                        </View>

                        <View style={styles.userInfoItem}>
                            <Text style={styles.userInfoTitle}>{collect != null ? Object.keys(collect).length : 0}</Text>
                            <Text style={styles.userInfoSubTitle}>收藏</Text>
                        </View>
                        <View style={styles.userInfoItem}>
                            <Text style={styles.userInfoTitle}>{follow != null ? Object.keys(follow).length : 0}</Text>
                            <Text style={styles.userInfoSubTitle}>关注</Text>
                        </View>
                        <View style={styles.userInfoItem}>
                            <Text style={styles.userInfoTitle}>{user.userdata?.fan}</Text>
                            <Text style={styles.userInfoSubTitle}>粉丝</Text>
                        </View>
                    </View>

                    {/* {posts.map((item) => (
<PostCard key={item.id} item={item} onDelete={handleDelete} />
))} */}

                </ScrollView>
            </View>
            <View style={{ backgroundColor: '#f5f5f5', height: 10 }} />
            <XFFlatList
                authorId={user.userdata?.user_id}
                navigation={navigation}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({

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
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});