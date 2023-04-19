import {
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles, { windowHeight } from '../../styles';
import { Images, Fonts } from '@assets';
import { signup, forgotPassword, httpRequestPost } from '../../actions';
import Toast from 'react-native-simple-toast';
import RadioGroup from 'react-native-radio-buttons-group';
import { useDispatch } from 'react-redux';
import { httpHeaders, registerURL } from '../../constants';

const signingRadioButtonData = [
  {
    id: '11',
    label:
      '单击“注册”即表示您同意我们的条款，并且您已阅读我们的数据政策，包括我们的Cookie使用。',
    value: 'policy',
    labelStyle: {
      color: '#fff',
      fontSize: Fonts.defaultFontSize,
      paddingRight: 20,
      lineHeight: 16,
    },
    color: '#fff',
  },
];

const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [signingRadioButtons, setSigningRadioButtons] = useState(
    signingRadioButtonData,
  );

  const [username, setusername] = useState('cc');
  const [email, setEmail] = useState('cc@cjic.ga');
  const [password, setPassword] = useState('123456');
  const [repassword, setRepassword] = useState('123456');
  const [signing, setSigning] = useState(false);
  const [errorUsername, seterrorUsername] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorRepassword, seterrorRepassword] = useState('');
  const [errorSigning, setErrorSigning] = useState('');


  function validation() {
    var usernameValid = false;
    if (username.length === 0) {
      seterrorUsername('用户名不能为空');
    } else if (username.indexOf(' ') >= 0) {
      seterrorUsername('用户名不能为空格');
    } else {
      seterrorUsername('');
      usernameValid = true;
    }
    var emailValid = false;
    if (email.length === 0) {
      setErrorEmail('邮箱不能为空');
    } else if (emailReg.test(email) === false) {
      console.log('邮箱格式错误');
      setErrorEmail('邮箱格式错误');
    } else {
      setErrorEmail('');
      emailValid = true;
    }

    var passwordValid = false;
    if (password.length === 0) {
      setErrorPassword('密码不能为空');
    } else if (password.length < 6) {
      setErrorPassword('密码必须大于六位');
    } else {
      setErrorPassword('');
      passwordValid = true;
    }

    var repasswordValid = false;
    if (repassword.length === 0) {
      seterrorRepassword('密码不能为空');
    } else if (repassword.length < 6) {
      seterrorRepassword('密码必须大于六位');
    } else if (repassword !== password) {
      seterrorRepassword('密码不一致');
    } else {
      seterrorRepassword('');
      repasswordValid = true;
    }

    var signingValid = false;
    if (signing === false) {
      setErrorSigning('请勾选进行注册');
    } else {
      setErrorSigning('');
      signingValid = true;
    }

    if (
      usernameValid &&
      emailValid &&
      passwordValid &&
      repasswordValid &&
      signingValid
    ) {
      return true;
    } else {
      return false;
    }
  }


  function onPressSigningRadioButton(radioButtonArray) {
    radioButtonArray.map(item => {
      if (item.selected) {
        setSigning(true);
      } else {
        setSigning(false);
      }
    });
    setSigningRadioButtons(radioButtonArray);
  }

  const gotoSignIn = () => {
    navigation.replace('SignIn');
  };
  const signup = async (dispatch) => {
    try {
      const params = {
        username,
        email: email,
        password: password,
        repassword,
      };
      const res = await httpRequestPost(registerURL, params, httpHeaders)
      if (res.code == 1000) {
        Toast.showWithGravity(
          '注册成功',
          Toast.SHORT,
          Toast.BOTTOM,
        );
        navigation.navigate('SignIn');
      } else {
        Toast.showWithGravity(
          '注册失败',
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

  const onSignUp = () => {
    if (validation()) {
        signup(dispatch)
    }
  };
  return (
    <ScrollView style={styles.scrollView_container2}>
      <View style={styles.container}>
        <View>
          <Image source={Images.splash} style={{ width: '100%', height: windowHeight / 2 }} />
        </View>
        <View style={[styles.mainContainer]}>
          <View style={styles.subContainer}>
            <TextInput
              placeholder="用户名"
              placeholderTextColor="gray"
              style={styles.input}
              onChangeText={e => setusername(e)}
              value={username}
            />
            {errorUsername.length > 0 && (
              <Text style={[styles.text_error, styles.text_align_left]}>
                {errorUsername}
              </Text>
            )}
            <TextInput
              placeholder="邮箱"
              placeholderTextColor="gray"
              style={styles.input}
              onChangeText={e => setEmail(e)}
              value={email}
            />
            {errorEmail.length > 0 && (
              <Text style={[styles.text_error, styles.text_align_left]}>
                {errorEmail}
              </Text>
            )}
            <TextInput
              secureTextEntry={true}
              placeholder="密码"
              placeholderTextColor="gray"
              style={styles.input}
              onChangeText={e => setPassword(e)}
              value={password}
            />
            {errorPassword.length > 0 && (
              <Text style={[styles.text_error, styles.text_align_left]}>
                {errorPassword}
              </Text>
            )}
            <TextInput
              secureTextEntry={true}
              placeholder="再次输入密码"
              placeholderTextColor="gray"
              style={styles.input}
              onChangeText={e => setRepassword(e)}
              value={repassword}
            />
            {errorRepassword.length > 0 && (
              <Text style={[styles.text_error, styles.text_align_left]}>
                {errorRepassword}
              </Text>
            )}
            <RadioGroup
              layout="row"
              containerStyle={{
                alignSelf: 'flex-start',
                paddingTop: 15,
                paddingRight: 15,
              }}
              radioButtons={signingRadioButtonData}
              onPress={onPressSigningRadioButton}
            />
            {errorSigning.length > 0 && (
              <Text style={[styles.text_error, styles.text_align_left]}>
                {errorSigning}
              </Text>
            )}
            <TouchableOpacity style={[styles.button]} onPress={onSignUp}>
              <Text style={[styles.text_banner, styles.text_color_white]}>
                注 册
              </Text>
            </TouchableOpacity>
            <View>
              <Text
                style={[
                  styles.text,
                  styles.text_small,
                  styles.text_color_white,
                ]}>
                已经有账号？立即 &nbsp;
                <Text
                  onPress={gotoSignIn}
                  style={[
                    styles.text,
                    styles.text_small,
                    styles.text_color_black,
                  ]}>
                  登 录
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
