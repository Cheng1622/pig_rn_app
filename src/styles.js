import { Dimensions, StyleSheet } from 'react-native';
import { Fonts } from '@assets';
export const windowWidth = Dimensions.get('screen').width;
export const windowHeight = Dimensions.get('screen').height;
export default StyleSheet.create({
  scrollView_container: {
    backgroundColor: 'black',
    height: windowHeight
  },
  scrollView_container2: {
    backgroundColor: '#2e64e5',
    height: windowHeight
  },
  container: {
    flexDirection: 'column',
    backgroundColor: 'black',
    width: '100%',
    padding: 0,
  },
  mainContainer: {
    // flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#2e64e5',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    marginTop: 30,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 35
  },
  subContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#2e64e5',
    width: '100%',
    padding: 15,
  },
  image_banner: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  text: {
    // alignItems: 'center',
    fontSize: 12,
  },
  text_color_white: {
    color: 'white',
  },
  text_color_black: {
    color: 'black',
  },
  text_banner: {
    fontSize: 18,
    // paddingBottom: 40,
  },
  text_bold: {
    fontWeight: 'bold',
  },
  text_small: {
    color: 'gray',
    fontSize: 11,
  },
  text_align_left: {
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  text_align_right: {
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  text_error: {
    color: '#b30000',
  },
  tf14: {
    fontSize: 14,
  },
  button: {
    backgroundColor: 'black',
    width: '100%',
    height: 53,
    color: 'white',
    padding: 12,
    marginTop: 30,
    marginBottom: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#005DE3',
    borderStyle: 'solid',
  },
  button1: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 53,
    color: 'black',
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#005DE3',
    borderStyle: 'solid',
  },
  active: {
    backgroundColor: '#005DE3',
  },
  input: {
    margin: 15,
    padding: 10,
    paddingLeft: 20,
    width: '100%',
    height: 53,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
    color: 'white',
  },
  input_otp: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    height: 55,
    width: 55,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  select: {
    margin: 15,
    padding: 10,
    height: 45,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: '#005DE3',
    width: '30%',
    fontSize: Fonts.defaultFontSize,
  },
  select_sign_up: {
    width: '30%',
  },
});
