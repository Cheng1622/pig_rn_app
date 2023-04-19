/* eslint-disable no-lone-blocks */
/* eslint-disable react/self-closing-comp */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Alert,
  SafeAreaView,
} from 'react-native';
import { TabRouter } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../../assets/images';
import { LOGIN_SUCCESS, LOGIN_SUCCESS_TOKEN, imageUrl } from '../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('screen');

export default function SettingScreen({ navigation }) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.user);
  const removeUserData = async dispatch => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (e) {
      console.log(e);
    }
    dispatch({ type: LOGIN_SUCCESS_TOKEN, data: {} });
    dispatch({ type: LOGIN_SUCCESS, data: {} });
    navigation.replace('Auth')
  };
  const onClickLogOut = async () => {
    Alert.alert(
      '',
      '你确定要登出吗？',
      [
        {
          text: '是',
          onPress: ()=>removeUserData(dispatch),
        },
        {
          text: '否',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>


      <View
        style={{
          width: '100%',
          borderBottomColor: '#E0E0E0',
          borderBottomWidth: 1,
          marginTop: 30,
        }}></View>
      <View
        style={{ flexDirection: 'row', marginTop: 30, borderWidth: 0.5, borderRadius: 10 }}
        onTouchEnd={() =>
          navigation.navigate('EditProfile', {
            // accountType: role,
            user: userData.user_id
          })
        }>
        <MaterialIcons name="emoji-emotions" size={50} color="#000" />
        <Text style={{ color: '#000', alignSelf: 'center', marginLeft: 30 }}>
          修改个人信息
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={50} color="#000" style={{ position: 'absolute', right: 0 }} />
      </View>
      {/* <View
        style={{ flexDirection: 'row', marginTop: 30 }}
        onTouchEnd={() =>
          navigation.navigate('AccountSetting', {
            // accountType: role,
            userData: userData.user,
          })
        }>
        <Image source={require('./i_account.png')} />
        <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 30 }}>
          Account Setting
        </Text>
        <Image
          source={require('./i_right.png')}
          style={{ position: 'absolute', right: 0 }}
        />
      </View> */}



      {/* <View
        style={{
          position: 'absolute',
          left: 30,
          paddingHorizontal: 30,
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onTouchEnd={() => onClickLogOut()}>
        <Text style={{ color: '#000', marginLeft: 5 }}>Log out</Text>
      </View> */}
      <View
        style={{
          flexDirection: 'row', marginTop: 30,
          backgroundColor: '#1455F5',
          borderRadius: 10,

        }}
        onTouchEnd={() => onClickLogOut()}>
        <MaterialIcons name="logout" size={50} color="#fff" />
        <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 30, fontSize: 20 }}>
          登出
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={50} color="#fff" style={{ position: 'absolute', right: 0 }} />

      </View>
      {/* {role == 1 && (
        <View
          style={{ flexDirection: 'row', marginTop: 30 }}
          onTouchEnd={() => navigation.navigate('Dashboard')}>
          <Image source={require('./i_dashboard.png')} />
          <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 30 }}>
            Dashboard
          </Text>
          <Image
            source={require('./i_right.png')}
            style={{ position: 'absolute', right: 0 }}
          />
        </View>
      )}
      {role == 1 && (
        <>
          <View
            style={{ flexDirection: 'row', marginTop: 30 }}
            onTouchEnd={() =>
              navigation.navigate('SubscriptionPlan', { id: user?.id })
            }>
            <Image source={require('./i_subscription.png')} />
            <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 30 }}>
              Subscriptions
            </Text>
            <Image
              source={require('./i_right.png')}
              style={{ position: 'absolute', right: 0 }}
            />
          </View>
          <View
            style={{ flexDirection: 'row', marginTop: 30 }}
            onTouchEnd={() => navigation.navigate('AddedProduct')}>
            <Image source={require('./i_products.png')} />
            <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 30 }}>
              Products
            </Text>
            <Image
              source={require('./i_right.png')}
              style={{ position: 'absolute', right: 0 }}
            />
          </View>
        </>
      )}
      {role == 2 && (
        <>
          <View
            style={{ flexDirection: 'row', marginTop: 30 }}
            onTouchEnd={() => navigation.navigate('Favorites')}>
            <Image source={require('./i_favorites.png')} />
            <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 30 }}>
              Favorites
            </Text>
            <Image
              source={require('./i_right.png')}
              style={{ position: 'absolute', right: 0 }}
            />
          </View>
          <View
            style={{ flexDirection: 'row', marginTop: 30 }}
            onTouchEnd={() => navigation.navigate('EventCalendar')}>
            <Image source={require('./i_calendar.png')} />
            <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 30 }}>
              Calendar
            </Text>
            <Image
              source={require('./i_right.png')}
              style={{ position: 'absolute', right: 0 }}
            />
          </View>
        </>
      )} */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  PrivacyPolicy: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#fff',
    width: width,
    height: height,
  },
  Group642: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Group379: {
    position: 'absolute',
    left: 0,
    width: 33.57,
    height: 33.57,
    zIndex: 1,
  },
  Txt432: {
    fontSize: 16,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '600',
    lineHeight: 30,
    color: '#000',
  },
});
