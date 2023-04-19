import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import SelectDropdown from 'react-native-select-dropdown';
import { connect } from 'react-redux';
import { ConvertToUrlForm } from '@util';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import Tags from 'react-native-tags';
import AudioRecord from 'react-native-audio-record';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import { Images } from '../../assets/images';
import { useSelector, useDispatch } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import { LOGIN_SUCCESS, httpHeaders, userURL } from '../../constants';
import { windowHeight, windowWidth } from '../../styles';
import { httpRequestGet } from '../../actions';

const options = {
  sampleRate: 16000, // default 44100
  channels: 1, // 1 or 2, default 1
  bitsPerSample: 16, // 8 or 16, default 16
  audioSource: 6, // android only (see below)
  wavFile: 'audio.wav', // default 'audio.wav'
};
AudioRecord.init(options);

function AddPostScreen({ navigation, route }) {
  const userData = useSelector(state => state.auth.user.data);
  const token = useSelector(state => state.auth.token.data);
  const dispatch = useDispatch();

  const textInputRef = React.useRef();
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [mode, setMode] = useState(0); // 0: create, 1: edit
  const [audio, setAudio] = useState('');
  const [video, setVideo] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState([]);
  const [user, setUser] = useState([]);
  const [bArr, setBArr] = useState('');

  // useEffect(() => {
  //   if (token !== undefined) {
  //     jwtauth(dispatch, token)
  //   }
  // }, []);
  // const jwtauth = async (dispatch, token) => {
  //   try {
  //     const httpHeaders = {
  //       'auth-token': token,
  //     };
  //     const res = await httpRequestGet(userURL, httpHeaders)
  //     console.info(res)
  //     if (res.code == 1000) {
  //       const userdata = res.data;
  //       dispatch({ type: LOGIN_SUCCESS, data: { userdata } });
  //       navigation.replace('MainApp');
  //     } else {
  //       dispatch({ type: LOGIN_SUCCESS, data: {} });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    textInputRef.current?.focus();
    if (route.params?.editMode) {
      setMode(1);
      setPostContent(route.params?.content);
    }
  }, [route]);
  // function onPressSigningRadioButton(radioButtonArray) {
  //   console.log(radioButtonArray)
  //   setSigningRadioButtons(radioButtonArray);
  //   // radioButtonArray.map(item => {
  //   //   if (item.selected) {
  //   //    console.info(item)

  //   //   } else {
  //   //     setSigning(false);
  //   //   }
  //   // });
  //   // setSigningRadioButtons(radioButtonArray);
  // }
  const MM = [
    ["国内新闻"],
    ["生猪期货"],
    ["国际新闻"],
    ["行业点评"],
    ["原创分析"],
    ["每日猪评"],
    ["展会报道"],
    ["种猪资讯"],
    ["种猪行业新闻"],
    ["种猪企业"],
    ["种猪企业访谈"],
    ["名企推荐"],
    ["猪场建设"],
    ["繁育管理"],
    ["饲养管理"],
    ["猪场管理"],
    ["批次化生产"],
    ["养猪大会"],
    ["行情分析"],
    ["玉米价格"],
    ["豆粕价格"],
    ["猪粮比"],
    ["饲料供需"],
    ["饲料分析"],
    ["生猪价格"],
    ["仔猪价格"],
    ["猪肉价格"],
    ["各省市猪价"],]
  const tabArr = [
    [58, "国内新闻"],
    [263, "生猪期货"],
    [147, "国际新闻"],
    [148, "行业点评"],
    [149, "原创分析"],
    [70, "每日猪评"],
    [118, "展会报道"],
    [170, "种猪资讯"],
    [166, "种猪行业新闻"],
    [143, "种猪企业"],
    [173, "种猪企业访谈"],
    [221, "名企推荐"],
    [31, "猪场建设"],
    [32, "繁育管理"],
    [91, "饲养管理"],
    [35, "猪场管理"],
    [233, "批次化生产"],
    [261, "养猪大会"],
    [81, "行情分析"],
    [68, "玉米价格"],
    [67, "豆粕价格"],
    [257, "猪粮比"],
    [256, "饲料供需"],
    [267, "饲料分析"],
    [63, "生猪价格"],
    [64, "仔猪价格"],
    [65, "猪肉价格"],
    [115, "各省市猪价"],]

  console.info(tabArr[bArr]?.[0])
  const onClickPost = () => {
    console.log('onclick post....');
    if (postContent.length < 30) {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'You have to type at least 30 characters',
      //   });
      ToastAndroid.show(
        '请您至少写30字',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }
    if (mode == 0) {
      let details = {
        func: 'new_post',
        content: postContent,
        tags: tags,
        user_id: userData.id,
        audio: audio,
        video: video,
        image: image,
      };
      let formBody = ConvertToUrlForm(details);
      fetch(postUrl, {
        method: 'POST',
        headers: httpHeaders,
        body: formBody,
      })
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          console.log('new post', responseData, formBody);
          if (responseData['error'] == false) {
            navigation.navigate('HomeScreen', { createPost: true });
          } else {
            // SweetAlert.showAlertWithOptions({
            //   title: responseData.msg,
            //   subTitle: '',
            //   confirmButtonTitle: 'Ok',
            //   confirmButtonColor: '#000',
            //   style: 'error',
            //   cancellable: true,
            // });
          }
        })
        .catch(error => {
          console.log('Error', error);
          // SweetAlert.showAlertWithOptions({
          //   title: 'Sorry, Failed retry.',
          //   subTitle: '',
          //   confirmButtonTitle: 'Ok',
          //   confirmButtonColor: '#000',
          //   style: 'error',
          //   cancellable: true,
          // });
        });
    } else {
      let details = {
        func: 'update_post',
        content: postContent,
        tags: tags,
        user_id: userData.id,
        audio: audio,
        video: video,
        image: image,
        id: route.params?.key,
      };
      console.log('=================================================', details);

      let formBody = ConvertToUrlForm(details);
      fetch(postUrl, {
        method: 'POST',
        headers: httpHeaders,
        body: formBody,
      })
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          console.log('update post', responseData);
          if (responseData['error'] == false) {
            navigation.navigate('HomeScreen', { createPost: true });
          } else {
            // SweetAlert.showAlertWithOptions({
            //   title: responseData.msg,
            //   subTitle: '',
            //   confirmButtonTitle: 'Ok',
            //   confirmButtonColor: '#000',
            //   style: 'error',
            //   cancellable: true,
            // });
          }
        })
        .catch(error => {
          console.log('Error', error);
          // SweetAlert.showAlertWithOptions({
          //   title: 'Sorry, Failed retry.',
          //   subTitle: '',
          //   confirmButtonTitle: 'Ok',
          //   confirmButtonColor: '#000',
          //   style: 'error',
          //   cancellable: true,
          // });
        });
    }
    // navigation.navigate('Home', { createPost: true });
  };

  // const onClickMic = () => {
  //   AudioRecord.start();

  //   Alert.alert('Voice Recording', 'Now, recording voice', [
  //     {
  //       text: 'Stop',
  //       onPress: async () => {
  //         // AudioRecord.stop();
  //         // or to get the wav file path
  //         var audioFile = await AudioRecord.stop();
  //         setAudio(audioFile);
  //       },
  //       style: 'cancel',
  //     },
  //     // {text: 'OK', onPress: () => console.log('OK Pressed')},
  //   ]);
  // };

  const onClickCamera = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.errorCode) {
        console.log('ImagePicker Error: ', res.errorMessage);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        // if (Array.isArray(res)) {

        // } else {
        //   var temp = [];
        //   temp.push(res);
        //   setImage(temp);
        // }
        setImage(res.assets);
        console.log('response', JSON.stringify(res));
        console.log('image[0]?.uri', image[0]?.uri);
      }
    });
  };

  const onClickGallery = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      setImage(res);
      console.log('Images res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
    } catch (err) {
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const onClickVideo = async () => {
    let options = {
      mediaType: 'video',
      storageOptions: {
        skipBackup: true,
        path: 'videos',
      },
    };
    launchCamera(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        setVideo(res);
        console.log('response', JSON.stringify(res));
      }
    });
  };

  // const userAvatar = userData ? (
  //   <Image
  //     // source={{ uri: imageUrl + 'profile_pic/' + userData.profile_pic }}
  //     style={{
  //       borderRadius: 50,
  //       alignSelf: 'center',
  //       marginTop: 30,
  //       width: 100,
  //       aspectRatio: 1,
  //       height: 'auto',
  //     }}
  //   />
  // ) : (
  //   <Image
  //     source={Images.default_user}
  //     style={{
  //       alignSelf: 'center',
  //       marginTop: 30,
  //       borderRadius: 50,
  //       width: 100,
  //       aspectRatio: 1,
  //       height: 'auto',
  //     }}
  //   />
  // );

  return (
    <SafeAreaView style={styles.PrivacyPolicy}>
      <View style={styles.Group642}>
        <TouchableOpacity
          style={styles.Group379}
          onPress={() => navigation.goBack()}>
          <Feather
            name="arrow-left"
            size={30}
            color="#000" />
        </TouchableOpacity>
        <Text style={styles.Txt432}>创作/提问</Text>
        <View
          style={{
            backgroundColor: '#1455F5',
            borderRadius: 8,
            width: 70,
            height: 30,
            position: 'absolute',
            right: 20,
            top: 20,
          }}
          onTouchEnd={() => onClickPost()}>
          <Text
            style={{
              color: '#fff',
              alignSelf: 'center',
              marginTop: 5,
              fontSize: 14,
            }}>
            {mode ? '更新' : '发布'}
          </Text>
        </View>
      </View>
      {/* <View>
        {userAvatar}
        <Text style={{ color: '#000', alignSelf: 'center', fontSize: 14 }}>
          {userData.Username}
        </Text>
      </View> */}
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
          color: '#fff',
          justifyContent: 'flex-start',

        }}>
        <View style={{
          flex: 1,
          justifyContent: 'space-around',
          flexDirection: 'row',
          width: '100%',
          color: '#000',
          backgroundColor: '#fff',
          textAlignVertical: 'top',
          borderColor: '#646464',
          borderBottomWidth: 0.5,
          height: 40
        }}
        >
          <Text style={{
            left: 0,
             position: "absolute",
            // color: '#000',
            alignItems:"center",
            justifyContent:"center",
            backgroundColor: '#fff',
            textAlignVertical: 'top',
            // bottom:20
            // borderStyle:'solid',
          }}>您选择的是</Text>
          <SelectDropdown
            buttonStyle={styles.select}
            buttonTextStyle={styles.text_color_white}
            defaultButtonText={'请选择发布的板块'}
            // defaultValueByIndex={0}
            data={MM}
            onSelect={(selectedItem, index) => {
              setBArr(index);
              // console.info(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // console.info(selectedItem, index)
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // console.info(item,index)
              return item;
            }}
          />
        </View>
        <TextInput
          multiline={true}
          numberOfLines={1}
          ref={textInputRef}
          style={{
            color: '#000',
            backgroundColor: '#fff',
            textAlignVertical: 'top',
            // borderStyle:'solid',
            borderColor: '#646464',
            borderBottomWidth: 0.5,
            height: 40
          }}
          placeholder="写出你的题目吧"
          selectionColor={'#2e64e5'}
          value={postTitle}
          onChangeText={e => setPostTitle(e)}
        />
        <TextInput
          multiline={true}
          numberOfLines={1}
          ref={textInputRef}
          style={{
            color: '#000',
            backgroundColor: '#fff',
            textAlignVertical: 'top',
            height: windowHeight / 4
          }}
          placeholder="写出你的想法和问题吧"
          selectionColor={'#2e64e5'}
          value={postContent}
          onChangeText={e => setPostContent(e)}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 10,
            marginBottom: 30,
          }}>
          {image && (
            <>
              <Image
                style={{ resizeMode: 'contain', width: '100%', height: 200 }}
                source={{ uri: image[0]?.uri }}
              // source={Images.default_user}
              />
            </>
          )}
          {video && (
            <Video
              source={{ uri: video[0]?.uri }}
              style={{ width: '100%', height: 200 }}></Video>
          )}
          {audio && (
            <View
              style={{
                display: 'flex',
                flexDirectrion: 'column',
                backgroundColor: '#242424',
                borderRadius: 8,
                padding: 8,
              }}>
              <Text style={{ color: '#fff' }}>{audio}</Text>
            </View>
          )}
        </View>
        {/* <MyTagInput /> */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderColor: '#646464',
            borderTopWidth: 0.5,
          }}>
          {/* <TouchableOpacity
            style={{ margin: 10 }}
            activeOpacity={0.1}
            onPress={() => {
              onClickMic();
            }}>
            <Feather name="mic" size={30} color="#000" />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{ margin: 10 }}
            activeOpacity={0.1}
            onPress={() => {
              onClickCamera();
            }}>
            <Feather name="camera" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ margin: 10 }}
            activeOpacity={0.1}
            onPress={() => {
              onClickGallery();
            }}>
            <Feather name="image" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ margin: 10 }}
            activeOpacity={0.1}
            onPress={() => {
              onClickVideo();
            }}>
            <Feather name="video" size={30} color="#000" />
          </TouchableOpacity>
        </View>
        {/* <RadioGroup
              layout="row"
              containerStyle={{
                alignSelf: 'flex-start',
                paddingTop: 15,
                paddingRight: 15,
              }}
              // radioButtons={signingRadioButtonData}
              onPress={onPressSigningRadioButton}
            /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  PrivacyPolicy: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    backgroundColor: '#fff',
    width: windowWidth,
    height: windowHeight,
  },
  Group642: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  Group379: {
    position: 'absolute',
    left: 20,
    top: 20,
    width: 33.57,
    height: 33.57,
    borderRadius: 16,
    zIndex: 1,
  },
  Group380: {
    position: 'absolute',
    right: 0,
    width: 33.57,
    height: 33.57,
    zIndex: 1,
  },
  Txt432: {
    fontSize: 16,
    // fontFamily: "Poppins, sans-serif",
    fontWeight: '600',
    lineHeight: 30,
    color: '#2e64e5',
  },
  iconNumber: {
    backgroundColor: 'red',
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    top: -5,
    right: 0,
    textAlign: 'center',
    paddingLeft: 3,
    paddingTop: 1,
  },
  select: {
    borderColor: 'white',
    right: 0,
    position: 'absolute'
  },
});

// const mapStateToProps = state => ({
//   userData: state.accounts.userData,
// });

// const mapDispatchToProps = dispacth => ({});
export default AddPostScreen;
