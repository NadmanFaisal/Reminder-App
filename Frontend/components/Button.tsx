import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";


type buttonProp = {
    text: string,
    onPress: () => void;
}

const SubmissionButton = (props: buttonProp) => {
    return (
        <Pressable style={styles.container} onPress={props.onPress}>
            <Text>{props.text}!</Text>
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

export default SubmissionButton;