/**
 * Different types of buttons, which have to 
 * include texxt, optional height, optional 
 * width, optional onPress function. 
 * 
 * If the height and width are not passed as props, 
 * it defaults to 75% and 100% respectively.
 */

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

