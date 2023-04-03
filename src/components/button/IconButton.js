import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const IconButton = ({ onPress, name, size, color }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Icon name={name} size={size} color={color} />
        </TouchableWithoutFeedback>
    )
}

// 设置默认属性值
IconButton.defaultProps = {
    size: 30,
    color: 'black'
}

export default IconButton
