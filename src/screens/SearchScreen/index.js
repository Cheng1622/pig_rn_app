import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Feather from 'react-native-vector-icons/Feather';
import { windowHeight, windowWidth } from '../../styles';
import XFFlatList from '../../components/HomeFlatList';
const SearchScreen = ({ navigation }) => {
    const [keyword, setKeyword] = useState('');
    const [iskeyword, setIsKeyword] = useState(false);
    const onChangeSearch = (query) => {
        setKeyword(query);
        setIsKeyword(true)
    };

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
                <Searchbar
                    placeholder="请输入关键词"
                    value={keyword}
                    onChangeText={onChangeSearch}
                    selectTextOnFocus={true}
                    iconColor='#2e64e5'
                    backgroundColor="#fff"
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        width: windowWidth - 100,
                        height: 50,
                        position: 'absolute',
                        right: 20,
                        top: 20,
                    }}
                />
            </View>
            {iskeyword ?
                <XFFlatList
                    keyword={keyword}
                    navigation={navigation}
                /> :
                null
            }
        </SafeAreaView>

    );
};












const styles = StyleSheet.create({
    PrivacyPolicy: {

        flexDirection: 'column',
        flex: 1,
        display: 'flex',
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
        height: 80
    },
    Group379: {
        position: 'absolute',
        left: 20,
        top: 30,
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
    bottomWrap: {
        height: 45,
        position: 'absolute',
        borderTopWidth: 1,
        borderColor: '#005DE3',
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'white'
    },
    bottomInner: {
        // paddingLeft: 100,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

});

export default SearchScreen;