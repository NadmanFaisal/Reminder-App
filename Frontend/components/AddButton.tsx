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
      borderRadius: 30,
      backgroundColor: '#FFFBDE',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 4
    },
    text: {
      color: 'black',
      fontSize: 25,
      fontWeight: 'bold',
    }
})

export default AddButton