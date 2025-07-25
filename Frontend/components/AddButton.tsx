/**
 * A circular button UI which is used as 
 * an indicator to add reminders.
 */

import React, { Pressable, StyleSheet, Text } from "react-native";

type buttonProp = {
    onPress?: () => void;
}

const AddButton = (props?: buttonProp) => {
    return (
        <Pressable style={styles.button} onPress={props?.onPress}>
            <Text style={styles.text}>+</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
      width: 30,
      height: 30,
      borderRadius: 25,
      backgroundColor: '#FFFBDE',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 4
    },
    text: {
      color: 'black',
      fontSize: 25,
      lineHeight: 25,
      fontWeight: 'bold',
    }
})

export default AddButton