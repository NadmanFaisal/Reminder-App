import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

type InputType = {
    type: string
}

const InputField = (props: InputType) => {
    const [text, onChangeText] = React.useState('');

    return (
        <View style={styles.container}>
            <TextInput
              style={styles.inputField}
              onChangeText={onChangeText}
              value={text}
              placeholder={props.type}
              placeholderTextColor={'#B7B7B7'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: 45,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputField: {
        height: 35,
        width: '70%',
        borderBottomWidth: 1,
        borderBottomColor: '#B7B7B7',
        padding: 6,
    },
})

export default InputField;