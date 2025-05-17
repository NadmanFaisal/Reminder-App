import React, { useRef } from "react";
import { Animated, View, Text, StyleSheet, Pressable } from "react-native";

type ReminderProp = {
    object: {
        reminderId: string;
        title: string;
        description: string;
        completed?: boolean;
    };
    onPress?: () => void;
};

export const Reminder = ({ object, onPress }: ReminderProp) => {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: -300, // Slide to the left
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0, // Fade out
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onPress?.();
        });
    };

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateX: slideAnim }],
                    opacity: opacityAnim,
                },
            ]}
        >
            <View style={styles.mainContainer}>
                <Pressable onPress={handlePress} style={styles.checkbox}>
                    {object.completed && <View style={styles.innerDot} />}
                </Pressable>
                <Text>{object.title}</Text>
            </View>
        </Animated.View>
    );
};

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