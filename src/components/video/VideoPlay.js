import React from 'react'
import { StyleSheet, View, Text, StatusBar, FlatList, Animated, } from 'react-native'
import Video from 'react-native-video'
// 引入组件
import Avatar from '../avatar/Avatar'
import HeartBtn from '../button/HeartBtn'
import IconTextButton from '../button/IconTextButton'
import RotateAvatar from '../avatar/RotateAvatar'


const VideoPlay = ({ paused }) => {
    const openComment = React.useContext(React.createContext())
    return (
        <View style={{ flex: 1 }}>
            {/* 顶部状态栏 */}
            <StatusBar
                translucent={true}
                backgroundColor="rgba(0,0,0,0)"
                barStyle="dark-content"
            />
            {/* 视频播放 */}
            <Video
                resizeMode="cover"
                repeat={true}
                style={styles.video}
                // 视频地址
                source={{ uri: 'http://player.alicdn.com/video/editor.mp4' }}
                // poster 视频未加载出了前先显示该图片
                poster="https://img12.360buyimg.com/pop/s1180x940_jfs/t1/121656/1/2153/65912/5ec388e3E3581fdfb/44f175e004088ceb.jpg.webp"
                posterResizeMode="cover"
                paused={paused}
            />
            {/* 图标按钮 */}
            <View style={styles.btns}>
                <View style={styles.btnItem}>
                    <Avatar uri="http://ww1.sinaimg.cn/large/007WurYGgy1ge8nxttd9nj302s02s0si.jpg" />
                </View>
                <View style={styles.btnItem}>
                    <HeartBtn number="66.6w" />
                </View>
                <View style={styles.btnItem}>
                    <IconTextButton
                        name="comment"
                        text="9850"
                        onPress={() => {
                            // 打开评论框
                            openComment(true);
                        }}
                    />
                </View>
                <View style={styles.btnItem}>
                    <IconTextButton name="share" text="4399" />
                </View>
                <View style={styles.btnItem}>
                    <RotateAvatar
                        size="sm"
                        border={10}
                        uri="http://ww1.sinaimg.cn/large/007WurYGgy1ge8nxttd9nj302s02s0si.jpg"
                    />
                </View>
            </View>

        </View>
    )
}

export default VideoPlay

const styles = StyleSheet.create({
    video: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    },
    btns: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        alignItems: 'center',
    },
    btnItem: {
        marginTop: 20,
    },
})
