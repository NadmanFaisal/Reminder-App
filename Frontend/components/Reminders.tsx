import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native"

type ReminderProp= {
    object: {
        reminderId: string;
        title: string;
        description: string;
        completed?: boolean,
    },
    onPress?: () => void;
}

export const Reminder = (props: ReminderProp) => {

    return (
        <View key={props.object.reminderId} style={styles.container}>
            <View style={styles.mainContainer}>
                <Pressable onPress={props.onPress} style={styles.checkbox}>
                    {props.object.completed && <View style={styles.innerDot} />}
                </Pressable>
                <Text>{props.object.title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: '100%',
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '80%',
        width: '90%',
        alignItems: 'center',
        borderWidth: 4,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    innerDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#000',
    },
})