import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Text, SafeAreaView, Pressable } from "react-native";
import { router } from 'expo-router';

type logInProp = {
    tokenData: string | null
}

const HomeScreen = ({ tokenData }: logInProp) => {
    const signOut = async () => {
        await AsyncStorage.removeItem("token");
        router.dismissTo('/signup')
    }
    return (
        <SafeAreaView>
            <Text>I am home screen</Text>
            <Pressable onPress={signOut}><Text>Sign Out</Text></Pressable>
        </SafeAreaView>
    )
}

export default HomeScreen