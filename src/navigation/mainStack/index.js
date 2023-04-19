import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
// import AddPostScreen from '../../screens/AddPostScreen';
// import editProfileScreen from '../../screens/editProfileScreen';
// import MessageScreen from '../../screens/MessageScreen';
// import ProfileScreen from '../../screens/profileScreen';
import Svg, { Path } from "react-native-svg";
import { Images } from '../../assets';
import VideoScreen from '../../screens/VideoScreen';
import MessageScreen from '../../screens/MessageScreen';
import DataScreen from '../../screens/DataScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function userData() {
    const userData = useSelector(state => state.auth.user);
    console.info(userData);
    return userData;
}
const TabBarCustomButton = ({ accessibilityLabel, accessibilityState, children, onPress }) => {
    var isSelected = accessibilityState.selected

    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: 'center', borderWidth: 0 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        top: 0,
                        borderWidth: 0
                    }}>
                    <View style={{ flex: 1, backgroundColor: '#2e64e5' }}></View>
                    <Svg
                        width={75}
                        height={61}
                        viewBox="0 0 75 61">
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={'#2e64e5'} />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: '#2e64e5' }}></View>
                </View>

                <TouchableOpacity
                    style={{
                        top: -22.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: 'white',
                        borderColor: "#2e64e5",
                        borderWidth: 1,
                        ...styles.shadow
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                    backgroundColor: '#2e64e5'
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}

export const FeedStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="慧养猪"
            component={HomeScreen}
            options={{
                headerTitleAlign: 'left',
                headerTitleStyle: {

                    color: '#2e64e5',
                    fontFamily: 'Kufam-SemiBoldItalic',
                    fontSize: 18,
                    fontWeight: 'bold',
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerRight: () => (
                    <View style={styles.homeRight}>
                        <TouchableOpacity
                            style={styles.rightButton}
                        >
                            <FontAwesome5.Button
                                onPress={() => navigation.navigate('Fire')}
                                name="fire"
                                size={22}
                                backgroundColor="#fff"
                                color="#2e64e5"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.rightButton}
                        >
                            <FontAwesome5.Button
                                onPress={() => navigation.navigate('Search')}
                                name="search"
                                size={22}
                                backgroundColor="#fff"
                                color="#2e64e5"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.rightButton}>
                            <FontAwesome5.Button
                                onPress={() => navigation.navigate('AddPost')}
                                name="plus"
                                size={22}
                                backgroundColor="#fff"
                                color="#2e64e5"
                            />
                        </TouchableOpacity>
                    </View>
                ),
            }}
        />
    </Stack.Navigator>
);

export const HangStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="全国猪价"
            component={DataScreen}
            options={{
                headerTitleAlign: 'left',
                headerTitleStyle: {

                    color: '#2e64e5',
                    fontFamily: 'Kufam-SemiBoldItalic',
                    fontSize: 18,
                    fontWeight: 'bold',
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerRight: () => (
                    <View style={styles.homeRight}>
                        <TouchableOpacity
                            style={styles.rightButton}
                        >
                            <FontAwesome5.Button
                                onPress={() => navigation.navigate('Search')}
                                name="search"
                                size={22}
                                backgroundColor="#fff"
                                color="#2e64e5"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.rightButton}>
                            <FontAwesome5.Button
                                onPress={() => navigation.navigate('AddPost')}
                                name="plus"
                                size={22}
                                backgroundColor="#fff"
                                color="#2e64e5"
                            />
                        </TouchableOpacity>
                    </View>
                ),
            }}
        />
    </Stack.Navigator>
);



const MessageStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen name="聊天" component={MessageScreen} options={{
            headerTitleAlign: 'left',
            headerTitleStyle: {

                color: '#2e64e5',
                fontFamily: 'Kufam-SemiBoldItalic',
                fontSize: 18,
                fontWeight: 'bold',
            },
            headerStyle: {
                shadowColor: '#fff',
                elevation: 0,
            },
        }} />

    </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="我的"
            component={ProfileScreen}
            options={{
                headerTitle: "",
                headerTitleAlign: 'left',
                headerTitleStyle: {
                    color: '#2e64e5',
                    fontFamily: 'Kufam-SemiBoldItalic',
                    fontSize: 18,
                    fontWeight: 'bold',
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerLeft: () => (
                    <TouchableOpacity  style={styles.rightButton} onPress={() => navigation.navigate('Setting')}>
                        <Ionicons name="settings" size={22} color="#2e64e5" />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddPost')}
                        style={styles.rightButton}>
                        <FontAwesome5.Button
                            onPress={() => navigation.navigate('AddPost')}
                            name="plus"
                            size={22}
                            backgroundColor="#fff"
                            color="#2e64e5"
                        />
                    </TouchableOpacity>
                ),

            }}
        />
        {/* <Stack.Screen
            name="EditProfile"
            component={editProfileScreen}
            options={{
                headerTitle: 'Edit Profile',
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                },
            }}
        /> */}
    </Stack.Navigator>
);

const AppStack = () => {
    const getTabBarVisibility = (route) => {
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : '';

        if (routeName === 'Chat') {
            return false;
        }
        return true;
    };
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarStyle: styles.tabBar,
                headerShown: false,
                tabBarShowLabel: false,
            }}>

            <Tab.Screen
                name="Home"
                component={FeedStack}
                options={({ route }) => ({

                    tabBarLabel: 'Home',
                    tabBarVisible: route.state && route.state.index === 0,

                    tabBarIcon: ({ focused, size }) => (
                        <View>
                            <MaterialCommunityIcons
                                name="home-outline"
                                color={focused ? '#2e64e5' : 'white'}
                                size={size}
                            />
                            <Text style={{
                                color: focused ? '#2e64e5' : 'white',
                                fontSize: 12,
                            }}>
                                新闻
                            </Text>

                        </View>

                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props} />
                    )
                })}
            />
            <Tab.Screen
                name="Video"
                component={VideoScreen}
                options={{
                    tabBarIcon: ({ focused, size }) => (
                        <View>
                            <MaterialCommunityIcons
                                name="play"
                                color={focused ? '#2e64e5' : 'white'}
                                size={size}
                            />
                            <Text style={{
                                color: focused ? '#2e64e5' : 'white',
                                fontSize: 12,
                            }}>
                                视频
                            </Text>

                        </View>
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props} />
                    )
                }}
            />
            <Tab.Screen
                name="Data"
                component={HangStack}
                options={{
                    tabBarIcon: ({ focused, size }) => (
                        <View>
                            <MaterialCommunityIcons
                                name="align-vertical-bottom"
                                color={focused ? '#2e64e5' : 'white'}
                                size={size}
                            />
                            <Text style={{
                                color: focused ? '#2e64e5' : 'white',
                                fontSize: 12,
                            }}>
                                行情
                            </Text>

                        </View>
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props} />
                    )
                }}
            />
            <Tab.Screen
                name="Message"
                component={MessageStack}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    display: "none",
                    // Or Hide tabbar when push!
                    // https://github.com/react-navigation/react-navigation/issues/7677
                    // tabBarVisible: route.state && route.state.index === 0,
                    // tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, size }) => (
                        <View>
                            <Ionicons
                                name="chatbox-ellipses-outline"
                                color={focused ? '#2e64e5' : 'white'}
                                size={size}
                            />
                            <Text style={{
                                color: focused ? '#2e64e5' : 'white',
                                fontSize: 12, textAlign: 'center'
                            }}>
                                聊天
                            </Text>
                        </View>
                    ),

                    tabBarButton: (props) => (


                        <TabBarCustomButton
                            {...props} />
                    )
                })}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    // tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, size }) => (
                        <View>
                            <Ionicons name="person-outline" color={focused ? '#2e64e5' : 'white'} size={size} />
                            <Text style={{
                                color: focused ? '#2e64e5' : 'white',
                                fontSize: 12,
                            }}>
                                我的
                            </Text>
                        </View>),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default AppStack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        height: 70,
        elevation: 0,
        paddingTop: 20,
        borderWidth: 0,

    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: 'white',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    homeRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    rightButton: {
        // marginHorizontal: 8,
        borderRadius: 30 / 2,
    },
    circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'Blue',
        borderRadius: 25,
    },
    text: {
        color: "white",
        fontSize: 13,

    }
})
