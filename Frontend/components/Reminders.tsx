/**
 * Appears as lists of reminders on the UI.
 */

import React, { useRef } from "react";
import { Animated, Image, View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import DeleteImage from "../assets/images/delete.png"
import { LinearGradient } from 'expo-linear-gradient';


type ReminderProp = {
    object: {
        reminderId: string;
        title: string;
        description: string;
        completed?: boolean;
    };
    onPress?: () => void;
    onTextBoxPress?: () => void;
    onDelete?: () => void;
};

export const Reminder = ({ object, onPress, onTextBoxPress, onDelete }: ReminderProp) => {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const swipeableRef = useRef<Swipeable>(null);

    const animateAndTrigger = () => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: -300,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onPress?.();
        });
    };

    const renderRightActions = (progress: Animated.AnimatedInterpolation<number>) => {
        const opacity = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });
        return (
            <Animated.View style={[styles.deleteButton, { opacity }]}>
                <TouchableOpacity
                    style={styles.deleteTouchContainer}
                    onPress={() => {
                        swipeableRef.current?.close();
                        Animated.parallel([
                            Animated.timing(slideAnim, {
                                toValue: -300,
                                duration: 300,
                                useNativeDriver: true,
                            }),
                            Animated.timing(opacityAnim, {
                                toValue: 0,
                                duration: 300,
                                useNativeDriver: true,
                            }),
                        ]).start(() => {
                            onDelete?.();
                        });
                }}
                >
                    <LinearGradient
                        colors={
                            [
                                'rgba(255, 0, 0, 0)', 
                                'rgba(255, 0, 0, 0.37), 0.1)', 
                                'rgba(255, 0, 0, 0.86)'
                            ]
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.deleteGradient}
                    >
                        <Image source={DeleteImage} style={{ width: 20, height: 20 }} />
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        )
    }
  

    return (
        <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
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
                    <Pressable style={styles.checkbox} onPress={animateAndTrigger}>
                        {object.completed && <View style={styles.innerDot} />}
                    </Pressable>
                    <Pressable style={styles.textContainer} onPress={onTextBoxPress}>
                        <Text>{object.title}</Text>
                    </Pressable>
                </View>
            </Animated.View>
        </Swipeable>
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
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '85%',
        height: '100%',
        alignItems: 'center',
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
    deleteButton: {
        marginRight: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        width: '25%',
        height: '80%',
    },
    deleteGradient: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        height: '100%',
        width: '100%'
    },
    deleteTouchContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});