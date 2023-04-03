import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
const SearchScreen = ({ navigation }) => {
    const [keyword, setKeyword] = useState('');

    const handleSearch = () => {
        // 在这里执行搜索操作
        console.log(`Searching for ${searchTerm}`);
    };
    const onChangeSearch = (query) => {
        setKeyword(query);
        console.log(keyword)
    };

    return (
        <SafeAreaView style={styles.container}>
            <Searchbar
                placeholder="请输入关键词"
                value={keyword}
                onChangeText={onChangeSearch}
                selectTextOnFocus={true}
                iconColor='#2e64e5'
                theme={{ backgroundColor: '#fff' }}
            />
        </SafeAreaView>
    );
};











const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "#fff",
    },
    goBack: {
        flexDirection: 'row',
        justifyContent: 'center',
        left: 0,
        position: "absolute"
    },
    Txt432: {
        fontSize: 16,
        // fontFamily: "Poppins, sans-serif",
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '600',
        lineHeight: 30,
        color: 'rgba(255, 255, 255, 1)',
    },

});

export default SearchScreen;