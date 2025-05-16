import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

type InputType = {
    type: string,
    value: string, 
    onChangeValue?: (text: string) => void;
    securedTextEntry: boolean,
    height?: number,
    width?: number,
    textAlign?: 'left' | 'right' | 'center',
    textAlignVertical?: 'top' | 'center' | 'bottom',
    multiline?: boolean,
    onPress?: () => void,
}

export const InputField = (props: InputType) => {
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

export const BoxedInputField = (props: InputType) => {
    return (
        <View style={[
            styles.boxedContainer, { 
                height: props.height ?? 45, 
                width: props.width ?? '100%' 
            }]}>
            <TextInput
              style={[
                styles.boxedInputField, { 
                textAlign: props.textAlign ?? 'left',
                textAlignVertical: props.textAlignVertical ?? 'center',
            }]}
                secureTextEntry={props.securedTextEntry}
                value={props.value}
                onChangeText={props.onChangeValue}
                placeholder={props.type}
                placeholderTextColor={'#B7B7B7'}
                multiline= {props.multiline}
            />
        </View>
    )
}

export const DateInputField = (props: InputType) => {
    return (
        <View style={[
            styles.boxedContainer, { 
                height: props.height ?? 45, 
                width: props.width ?? '100%' 
            }]}>
            <TextInput
              style={[
                styles.boxedInputField, { 
                textAlign: props.textAlign ?? 'left',
                textAlignVertical: props.textAlignVertical ?? 'center',
            }]}
                secureTextEntry={props.securedTextEntry}
                value={props.value}
                onChangeText={props.onChangeValue}
                placeholder={props.type}
                placeholderTextColor={'#B7B7B7'}
                onPress={props.onPress}
                editable={false}
            />
        </View>
    )
}

export const TimeinputField = (props: InputType) => {
    return (
        <View style={[
            styles.boxedContainer, { 
                height: props.height ?? 45, 
                width: props.width ?? '100%' 
            }]}>
            <TextInput
              style={[
                styles.boxedInputField, { 
                textAlign: props.textAlign ?? 'left',
                textAlignVertical: props.textAlignVertical ?? 'center',
            }]}
                secureTextEntry={props.securedTextEntry}
                value={props.value}
                onChangeText={props.onChangeValue}
                placeholder={props.type}
                placeholderTextColor={'#B7B7B7'}
                onPress={props.onPress}
                editable={false}
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
    boxedContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxedInputField: {
        height: '100%',
        width: '100%',
        borderWidth: 3,
        padding: 6,
    }
})

