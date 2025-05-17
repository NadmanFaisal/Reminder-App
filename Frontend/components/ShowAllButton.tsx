import React from "react";
import { View, Text, StyleSheet, Pressable, ViewStyle, DimensionValue } from 'react-native'

type ButtonProps = {
    height?: DimensionValue,
    width?: DimensionValue,
    onPress?: () => void
}

const ShowAllButton = (props: ButtonProps) => {
    const dynamicStyle: ViewStyle = {
        height: props.height ?? '100%',
        width: props.width ?? '100%'
    }
    return (
        <Pressable style={[styles.container, dynamicStyle]} onPress={props.onPress}>
            <Text style={styles.text}>Show all</Text>
        </Pressable>
    )
}



const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#B7B7B7'
    }
})

export default ShowAllButton