import React from 'react'
import { Text } from 'react-native'
import IconButton from './IconButton'

const IconTextButton = ({ text, onPress, name, size, color }) => {
    return (
        <>
            <IconButton name={name} onPress={onPress} color={color} size={size} />
            <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
            }}>{text}</Text>
        </>
    )
}

// 设置默认属性值
IconTextButton.defaultProps = {
    color: 'white',
    size: 35,
}

export default IconTextButton
