import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

type InputType = {
    type: string,
    value: string, 
    onChangeValue: (text: string) => void;
    securedTextEntry: boolean,
}

const InputField = (props: InputType) => {
    return (
        <View style={styles.container}>
            <TextInput
              style={styles.inputField}
              secureTextEntry={props.securedTextEntry}
              value={props.value}
              onChangeText={props.onChangeValue}
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