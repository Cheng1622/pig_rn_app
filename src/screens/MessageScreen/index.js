import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Messages = [
    {
        id: '1',
        userName: 'bb',
        messageTime: '4 分钟前',
        messageText:
            '还好',
    },
    // {
    //     id: '2',
    //     userName: 'John Doe',
    //     userImg: '',
    //     messageTime: '2 hours ago',
    //     messageText:
    //         'Hey there, this is my test for a post of my social app in React Native.',
    // },
    // {
    //     id: '3',
    //     userName: 'Ken William',
    //     userImg: '',
    //     messageTime: '1 hours ago',
    //     messageText:
    //         'Hey there, this is my test for a post of my social app in React Native.',
    // },
    // {
    //     id: '4',
    //     userName: 'Selina Paul',
    //     userImg: '',
    //     messageTime: '1 day ago',
    //     messageText:
    //         'Hey there, this is my test for a post of my social app in React Native.',
    // },
    // {
    //     id: '5',
    //     userName: 'Christy Alex',
    //     userImg: '',
    //     messageTime: '2 days ago',
    //     messageText:
    //         'Hey there, this is my test for a post of my social app in React Native.',
    // },
];

const MessageScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={Messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Chat', { userName: item.userName })}>
                        <View style={styles.userinfo}>
                            <View style={styles.userimgwrapper}>
                                <Ionicons name='person' style={styles.userimg} size={50} />
                            </View>
                            <View style={styles.textsection}>
                                <View style={styles.userinfotext}>
                                    <Text style={styles.username}>{item.userName}</Text>
                                    <Text style={styles.posttime}>{item.messageTime}</Text>
                                </View>
                                <Text style={styles.messagetext}>{item.messageText}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default MessageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingleft: 20,
        paddingright: 20,
        alignitems: 'center',
        backgroundcolor: '#ffffff',
    },
    card: {
        width: "100%",
    },
    userinfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userimgwrapper: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,

    },
    userimg: {
        width: 50,
        height: 50,
        borderRadius: 20,
    },
    userinfotext: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    username: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Lato-Regular',
    },
    posttime: {
        fontSize: 12,
        color: '#666',
        fontFamily: 'Lato-Regular',
    },
    messagetext: {
        fontSize: 14,
        color: '#333333',
    },
    textsection: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 15,
        paddingLeft: 0,
        marginLeft: 10,
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
});
