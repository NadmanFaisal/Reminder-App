/**
 * A button class which allows users to define 
 * done and cancel functions on the screen.
 */

import React, { StyleSheet, Pressable, Text } from 'react-native'

type buttonProp = {
    text: string,
    onPress?: () => void;
}

const DoneCancelButton = (props: buttonProp) => {
    return (    
        <Pressable style={styles.button} onPress={props.onPress}>
            <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 80
    },
    text: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center'
    }
})

export default DoneCancelButton