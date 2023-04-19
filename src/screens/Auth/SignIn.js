import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import styles, { windowHeight } from '../../styles';
import { Images } from '@assets';
import { addUserData, httpRequestGet, httpRequestPost, jwtauth, signin } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { forgotPassword } from '../../actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { httpHeaders, loginURL, LOGIN_SUCCESS, LOGIN_SUCCESS_TOKEN, userURL } from '../../constants';

const SignIn = ({ navigation }, props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [email, setEmail] = useState('cc@cjic.ga');
  const [password, setPassword] = useState('123456');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // useEffect(() => {
  //   if (Object.keys(user).length !== 0) {
  //     navigation.replace('MainApp');
  //   }
  // }, [user]);

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const validation = () => {
    var emailValid = false;
    if (email.length === 0) {
      setEmailError('邮箱不能为空');
    } else if (email.length < 6) {
      // setEmailError('Email should be minimum 6 characters');
    } else if (email.indexOf(' ') >= 0) {
      setEmailError('邮箱不能有空格');
    } else if (reg.test(email) === false) {
      console.log('邮箱格式错误');
      setEmailError('邮箱格式不正确');
    } else {
      setEmailError('');
      emailValid = true;
    }

    var passwordValid = false;
    if (password.length === 0) {
      setPasswordError('密码不能为空');
    } else if (password.indexOf(' ') >= 0) {
      setPasswordError('密码不能有空格');
    } else {
      setPasswordError('');
      passwordValid = true;
    }
    if (emailValid && passwordValid) {
      setEmail('');
      setPassword('');
      return true;
    } else {
      return false;
    }
  };


  const signin = async (dispatch) => {
    try {
      const params = {
        email: email,
        password: password,
      };
      const res = await httpRequestPost(loginURL, params, httpHeaders)
      if (res.code == 1000) {
        const data = res.data;
        dispatch({ type: LOGIN_SUCCESS_TOKEN, data: { data } });
        jwtauth(dispatch, data)
      } else {
        dispatch({ type: LOGIN_SUCCESS_TOKEN, data: {} });
       
      }
    } catch (error) {
      console.log(error);
      Toast.showWithGravity(
        '服务繁忙',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    }
  };


  const jwtauth = async (dispatch, token) => {
    try {
      console.info(token)
      const httpHeaders = {
        'auth-token': token,
      };
      const res = await httpRequestGet(userURL, httpHeaders)
      console.info(res)
      if (res.code == 1000) {
        const userdata = res.data;
        dispatch({ type: LOGIN_SUCCESS, data: { userdata } });
        Toast.showWithGravity(
          '登录成功',
          Toast.SHORT,
          Toast.BOTTOM,
        );
        navigation.replace('MainApp');
      } else {
        dispatch({ type: LOGIN_SUCCESS, data: {} });
        Toast.showWithGravity(
          '登录失败',
          Toast.SHORT,
          Toast.BOTTOM,
        );
      }
    } catch (error) {
      console.log(error);
      Toast.showWithGravity(
        '服务繁忙',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    }
  };

  const onSignIn = async () => {
    if (validation()) {
      signin(dispatch)
    }
  };
  const gotoSignUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <ScrollView style={styles.scrollView_container2}>
      <SafeAreaView
        style={{ alignItems: 'center', backgroundColor: 'black', width: '100%', }}>
        <View style={{ width: '100%', paddingBottom: 10 }}>
          <Image
            source={Images.splash}
            style={{ width: '100%', height: windowHeight / 2 }}
          />
        </View>
        <View style={[styles.mainContainer]}>
          <View style={styles.subContainer}>
            <TextInput
              style={styles.input}
              placeholder="邮箱"
              placeholderTextColor="gray"
              onChangeText={e => setEmail(e)}
              value={email}
            />
            {emailError.length > 0 && (
              <Text style={[styles.text_error, styles.text_align_left]}>
                {emailError}
              </Text>
            )}
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="密码"
              placeholderTextColor="gray"
              onChangeText={e => setPassword(e)}
              value={password}
            />
            {passwordError.length > 0 && (
              <Text style={[styles.text_error, styles.text_align_left]}>
                {' '}
                {passwordError}{' '}
              </Text>
            )}
            <TouchableOpacity style={[styles.button]} onPress={onSignIn}>
              <Text style={[styles.text_banner, styles.text_color_white]}>
                登 录
              </Text>
            </TouchableOpacity>
            <View>
              <Text
                style={[styles.text, styles.text_small, styles.text_color_white]}>
                没有帐户？立即 &nbsp;
                <Text
                  onPress={gotoSignUp}
                  style={[
                    styles.text,
                    styles.text_small,
                    styles.text_color_black,
                  ]}>
                  注 册
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignIn;
