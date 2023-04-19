import React, { useImperativeHandle, useRef, useState } from 'react';
import {
    TouchableOpacity,
    View,
    Animated,
} from 'react-native';
import { windowHeight, windowWidth } from '../styles';
 
const c_duration = 200;
const c_deviceHeight =windowHeight;
 
export const popupMode = {
    center: "center",
    bottom: "bottom"
};
const CoverLayer = (props, ref) => {
    const opacityValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1.1)).current;
    const bottom = useRef(new Animated.Value(-c_deviceHeight)).current;
    const [isShow, setIsShow] = useState(false);
    const [displayMode, setDisplayMode] = useState(null);
    // const [renderContent, setRenderContent] = useState(props.renderContent);
    // const [coverLayerEvent, setCoverLayerEvent] = useState(props.coverLayerEvent);
    const renderContent = useRef(null);
    renderContent.current = props.renderContent;
    const coverLayerEvent = useRef(null);
    coverLayerEvent.current = props.coverLayerEvent;
    // const { renderContent, coverLayerEvent } = props;
    useImperativeHandle(ref, () => ({
        showWithContent: (renderContent, coverLayerEvent, displayMode) => {
            showWithContent(renderContent, coverLayerEvent, displayMode);
        },
        show: (displayMode) => {
            show(displayMode);
        },
        hide: (callback) => {
            hide(callback);
        }
    }));
 
    /**
     * 显示弹框(该方法是为了简化一个界面有多个弹框的情况)
     * renderContent: func, 渲染弹框内容的方法, 会覆盖props.renderContent
     * coverLayerEvent: func, 点击背景触发的事件, 会覆盖props.coverLayerEvent
     **/
    const showWithContent = async (renderContent, coverLayerEvent, displayMode) => {
        if (isShow) {
            hide(displayMode, async () => {
                await function () {
                    // setCoverLayerEvent(coverLayerEvent)
                    // setRenderContent(renderContent)
                    coverLayerEvent.current = coverLayerEvent
                    renderContent.current = renderContent
                };
                show(displayMode);
            })
        } else {
            await function () {
                // setCoverLayerEvent(coverLayerEvent)
                // setRenderContent(renderContent)
                coverLayerEvent.current = coverLayerEvent
                renderContent.current = renderContent
            };
            show(displayMode);
        }
    }
 
    // 显示弹框
    const show = (displayMode) => {
        setIsShow(true);
        setDisplayMode(displayMode)
        try {
            Animated.parallel([
                Animated.timing(opacityValue, {
                    toValue: 1,
                    duration: c_duration,
                    useNativeDriver: true,
                }),
                popupMode.bottom == displayMode ? showFromBottom() : showFromCenter()
            ]).start();
        } catch (error) {
            console.log(error)
        }
 
    }
 
    // 从中间弹出界面
    const showFromCenter = () => {
        return (
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: c_duration,
                useNativeDriver: true,
            })
        )
    }
 
    // 从底部弹出界面
    const showFromBottom = () => {
        return (
            Animated.timing(bottom, {
                toValue: 0,
                duration: c_duration,
                useNativeDriver: true,
            })
        )
    }
 
    // 隐藏弹框
    const hide = (callback) => {
        Animated.parallel([
            Animated.timing(opacityValue, {
                toValue: 0,
                duration: c_duration,
                useNativeDriver: true,
            }),
            popupMode.bottom == displayMode ? hideFromBottom() : hideFromCenter()
        ]).start(async () => {
            await setIsShow(false);
            callback && callback();
        });
    }
 
    //从中间隐藏
    const hideFromCenter = () => {
        return (
            Animated.timing(scaleValue, {
                toValue: 1.1,
                duration: c_duration,
                useNativeDriver: true,
            })
        )
    }
 
    // 从底部隐藏
    const hideFromBottom = () => {
        return (
            Animated.timing(bottom, {
                toValue: -c_deviceHeight,
                duration: c_duration,
                useNativeDriver: true,
            })
        )
    }
 
    return (
        isShow &&
        <Animated.View style={{
            width:windowWidth,
            justifyContent: popupMode.bottom == displayMode ? 'flex-end' : 'center',
            alignItems: 'center',
            backgroundColor: props.coverLayerColor ? props.coverLayerColor : 'rgba(0,0,0,0.4)',
            position: 'absolute',
            top: 0,
            bottom: 0,
            opacity: opacityValue
        }}>
            <TouchableOpacity style={{
                width:windowHeight,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 0,
                top: 0,
            }}
                activeOpacity={1}
                onPress={() => { coverLayerEvent.current && coverLayerEvent.current() }} />
            <Animated.View style={popupMode.bottom == displayMode ?
                { translateY: bottom } : { transform: [{ scale: scaleValue }] }}>
                {renderContent.current && renderContent.current()}
            </Animated.View>
        </Animated.View>
    );
}
 
export default React.forwardRef(CoverLayer);