import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import GoogleLogo from "../assets/images/Google.svg"


type buttonProp = {
    text: string,
}

const OAuthButton = (props: buttonProp) => {
    return (
        <View style={styles.container}>
            <GoogleLogo />
            <Text>{props.text}!</Text>
        </View>
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