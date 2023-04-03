import React, { useEffect, useState } from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    Text,
    Button,
    View,
    Alert,
    Image,
    ScrollView,
    Modal,
    TouchableOpacity,
    StatusBar,
    TextInput
} from 'react-native';
import WebView from 'react-native-webview';
import { httpRequestGet } from '../../actions';
import Toast from 'react-native-simple-toast';

const DataScreen = ({ navigation, route, accountType, props }) => {
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState('')
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        setLoading(true);
        try {
            const newData = await httpRequestGet(`listlast`);
            const [a] = newData.data
            setContent(a.content);
            setLoading(false)
            console.log(a.content)
        } catch (error) {
            console.log(error);
            Toast.showWithGravity(
                '加载失败',
                Toast.SHORT,
                Toast.BOTTOM,
            );
        }
    };
    let htmlStyle = `
    <style>
    
    .look-tit {
     width: 100%;
     background: #ffffff;
     height: 2rem;
     line-height: 2rem;
     font-size: 0.8rem;
     margin-top: 0.5rem;
}

.look-tit ul li {
     width: 32%;
     float: left;
     text-align: center;
     border-bottom: 0.1rem #dddddd solid;
     color: #333333;
     list-style: none;
}

.look-tit ul li.active {
     border-bottom: 0.1rem #2e64e5 solid;
     color: #2e64e5;
}

.look-con table {
     width: 100%;
     font-size: 0.8rem;
     text-align: center;
}

.look-con table th {
     line-height: 1rem;
     border-top: none;
     text-align: center;
     border-bottom: 1px solid #cfcfcf;
     font-weight: normal;
     font-size: 1rem;
}

.look-con table tr td {
     border-bottom: 1px dashed #cfcfcf;
}
.red{
 color: red
}

.look-con table td {
     line-height: 2rem;
     text-align: center;
}

.look-con table td em {
     padding: 0.02rem 0.1rem;
     background: #2e64e5;
     border-radius: 10px;
     color: #fff;
}

.look-con table td .sem {
     padding: 0.02rem 0.06rem;
}

.jt-up,
.jt-down {
     width: 8px;
     height: 14px;
     position: relative;
     display: inline-block;
     margin-left: 7px;
}

.jt-up {
     background-size: 8px 14px;
     padding-right: 5px;
}

.jt-down {
 
     background-size: 8px 14px;
     padding-right: 5px;
}
</style>

 
     <link rel="Stylesheet" type="text/css" href="https://cdn.yangzhu360.com/2020/0320/tianjia.css" />
 
     <script type="text/javascript" src="https://cdn.yangzhu360.com/2020/0311/auto.js"></script>
 
     <script src="https://cdn.yangzhu360.com/yangzhu360/js/v1/jquery.js"></script>
 `
    let comment = `<div style="height:3rem"></div>
 <script type='text/javascript' src='http://cdn.staticfile.org/jquery/2.1.4/jquery.min.js'></script>
 <script type="text/javascript" src="https://cdn.yangzhu360.com/yangzhu360/css/layer/layer.js"></script>
 <script type="text/javascript" src="https://cdn.yangzhu360.com/yangzhu360/js/js-php.js"></script>
 <script type="text/javascript"
     src="https://cdn.yangzhu360.com/yangzhu360/js/mobile-pig-price/chazhujia.js"></script>
 <script src="https://cdn.yangzhu360.com/yangzhu360/js/v1/wx-js-sdk.js"></script>
`
    console.info(content)
    return (
        <View style={styles.container} >
            {loading ? <Text>加载中---</Text> :
                <WebView
                    source={{
                        html: `
         ${htmlStyle}${content}${comment}
                ` }}
                    javaScriptEnabled={true}
                    setBuiltInZoomControls={false}
                    domStorageEnabled={true}
                    scrollEnabled={false}
                    automaticallyAdjustContentInsets={true}
                    showsVerticalScrollIndicator={false}
                    textZoom={100}
                />}
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#ffffff'
    },
    bottomWrap: {
        height: 65,
        position: 'absolute',
        borderTopWidth: 1,
        borderColor: '#999',
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'white'
    },
    bottomInner: {
        padding: 10,
        // paddingLeft: 100,
        height: 55,
        flexDirection: 'row',
        // justifyContent: 'space-between'
    },


});

const htmlStyles = StyleSheet.create({

    p: {
        color: '#2c2c2c',
        lineHeight: 30,
        fontSize: 16
    }

});

export default DataScreen;
