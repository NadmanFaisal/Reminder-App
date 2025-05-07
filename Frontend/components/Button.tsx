import React from "react";
import { View, StyleSheet, Text } from "react-native";


type buttonProp = {
    text: string,
}

const SubmissionButton = (props: buttonProp) => {
    return (
        <View style={styles.container}>
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

export default SubmissionButton;