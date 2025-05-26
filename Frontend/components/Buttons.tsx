import React from "react";
import { StyleSheet, Text, Pressable, ViewStyle, DimensionValue } from "react-native";


type buttonProp = {
    text: string,
    height?: DimensionValue,
    width?: DimensionValue,
    onPress?: () => void;
}

export const SubmissionButton = (props: buttonProp) => {
    return (
        <Pressable style={styles.container} onPress={props.onPress}>
            <Text>{props.text}!</Text>
        </Pressable>
    )
}

export const SignoutButton = (props: buttonProp) => {
    const dynamicStyle: ViewStyle = {
        height: props.height ?? '75%',
        width: props.width ?? '100%',
    }
    return (
        <Pressable style={[styles.container, dynamicStyle]} onPress={props.onPress}>
                <Text>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '15%',
        width: '35%',
        borderWidth: 4,
    }
})

