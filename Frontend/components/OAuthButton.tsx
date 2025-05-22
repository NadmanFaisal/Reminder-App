import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import GoogleLogo from "../assets/images/Google.svg"


type buttonProp = {
    text: string,
    onPress?: () => void,
}

const OAuthButton = (props: buttonProp) => {
    return (
        <Pressable style={styles.container} onPress={props.onPress}>
            <GoogleLogo />
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

export default OAuthButton;