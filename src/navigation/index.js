import React from 'react';
import { Text, View, Image, Pressable, StatusBar, TextInput } from 'react-native';
import Loading from '../screens/Loading';
import Splash from '../screens/Splash';
import Auth from '../screens/Auth/Auth';
import SignUp from '../screens/Auth/SignUp';
import SignIn from '../screens/Auth/SignIn';
// import ForgotPassword from '../screens/Auth/ForgotPassword';
// import ForgotPassword1 from '../screens/Auth/ForgotPassword1';
// import ForgotPassword2 from '../screens/Auth/ForgotPassword2';
import Main from './mainStack';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getUser } from '../actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewDetail from '../screens/HomeScreen/NewDetail';
import ChatScreen from '../screens/MessageScreen/ChatScreen';
import SettingScreen from '../screens/Setting';
import AccountSetting from '../screens/AccountSetting';
import VideoDetail from '../screens/VideoScreen/VideoDetail';
import AddPostScreen from '../screens/AddPost';
import SearchScreen from '../screens/SearchScreen';
import FireScreen from '../screens/FireScreen';
import EditProfile from '../screens/EditProfile';
// import {Images} from '@assets';
// import {TouchableOpacity} from 'react-native';
// import {ProductItem} from '@components';
// import PurchasedProducts from '../screens/PurchasedProducts';
// import Events from '@screens/Events/Events';
// import EventDetails from '@screens/Events/EventDetails';
// import Products from '@screens/Products';
// import ProductDetail from '../screens/Products/Detail';
// import Checkout from '@screens/Products/Checkout';
// import CheckOutScreen from '../screens/CheckOutScreen';
// import SettingScreen from '@screens/Setting';
// import EditProfile from '@screens/EditProfile';
// import AccountSetting from '../screens/AccountSetting';
// import FavoritesScreen from '../screens/FavoritesScreen';
// import EventCalendarScreen from '../screens/EventCalendarScreen';
// // import PaymentMethodScreen from '../screens/PaymentMethodScreen';
// import NotificationSettingScreen from '../screens/NotificationSettingScreen';
// import PaymentPayScreen from '../screens/PaymentPayScreen';
// import Otp from '../screens/Auth/Otp';
// import TermsOfUseScreen from '../screens/TermsOfUseScreen';
// import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
// import StoreScreen from '../screens/StoreScreen';
// import CreatePost from '../screens/Home/CreatePost';

const Stack = createNativeStackNavigator();

const navigation = props => {
  const { auth } = props;
  // props.getUser()

  // console.log('Navigation: ', auth);

  return (
    <NavigationContainer>
      {/* <StatusBar barStyle="light-content" backgroundColor="#7b1fa2" /> */}
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="NewDetail"
          component={NewDetail}
          options={({ navigation }) => ({
            headerTitle: '',
            headerShown: true,
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" color="#212121" size={32} />
              </Pressable>
            ),
          })}
        />

        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: route.params.userName,
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            tabBarVisible: false,
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" color="#212121" size={32} />
              </Pressable>
            ),
          })}
        />

        <Stack.Screen name="Setting" component={SettingScreen}
          options={({ navigation }) => ({
            title: '设置',
            headerTitleAlign: "center",
            headerShown: true,
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" color="#212121" size={32} />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen name="AccountSetting" component={AccountSetting} />
        <Stack.Screen name="AddPost" component={AddPostScreen} />
        <Stack.Screen name="VideoDetail" component={VideoDetail} />
        <Stack.Screen name="Search" component={SearchScreen}
        // options={({ navigation }) => ({
        //   title: '搜索',
        //   headerTitleAlign: "center",
        //   headerShown: true,
        //   headerLeft: () => (
        //     <Pressable
        //       onPress={() => navigation.goBack()}>
        //       <Ionicons name="arrow-back-outline" color="#212121" size={32} />
        //     </Pressable>
        //   ),
        // })}
        />
        <Stack.Screen name="Fire" component={FireScreen}
          options={({ navigation }) => ({
            title: '最热',
            headerTitleAlign: "center",
            headerShown: true,
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" color="#212121" size={32} />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen name="EditProfile" component={EditProfile}
          options={({ navigation }) => ({
            title: '个人信息',
            headerTitleAlign: "center",
            headerShown: true,
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" color="#212121" size={32} />
              </Pressable>
            ),
          })}
        />

        {/* <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="CheckOut" component={Checkout} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="EventDetail" component={EventDetails} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="EventCalendar" component={EventCalendarScreen} />
        <Stack.Screen name="ProductCheckout" component={PaymentMethodScreen} />
        <Stack.Screen name="PaymentPay" component={PaymentPayScreen} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
        <Stack.Screen
          name="NotificationSetting"
          component={NotificationSettingScreen}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={({navigation, route}) => ({
            title: 'Forgot Password',
            headerTitle: 'Forgot Password',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Image source={Images.back}></Image>
              </TouchableOpacity>
            ),
            headerShown: true,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen
          name="ForgotPassword1"
          component={ForgotPassword1}
          options={({navigation, route}) => ({
            title: 'Enter OTP',
            headerTitle: 'Enter OTP',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Image source={Images.back}></Image>
              </TouchableOpacity>
            ),
            headerShown: true,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen
          name="ForgotPassword2"
          component={ForgotPassword2}
          options={({navigation, route}) => ({
            title: 'Enter New Password',
            headerTitle: 'Enter New Password',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword1')}>
                <Image source={Images.back}></Image>
              </TouchableOpacity>
            ),
            headerShown: true,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        /> */}
        <Stack.Screen
          name="MainApp"
          component={Main}
          options={({ navigation, route }) =>
            route.name === 'HomeScreen'
              ? { headerShown: true }
              : { headerShown: false }
          }
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = {
  getUser,
};
const MainNavigator = connect(mapStateToProps, mapDispatchToProps)(navigation);

export default MainNavigator;
