import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, SafeAreaView, Pressable } from "react-native";

type logInProp = {
    setIsLoggedIn: (value: boolean) => void
}

const HomeScreen = ({ setIsLoggedIn }: logInProp) => {
    const signOut = async () => {
        await AsyncStorage.removeItem("isLoggedIn");
        await AsyncStorage.removeItem("token");
        setIsLoggedIn(false);
    }
    return (
        <SafeAreaView>
            <Text>I am home screen</Text>
            <Pressable onPress={signOut}><Text>Sign Out</Text></Pressable>
        </SafeAreaView>
    )
}

export default HomeScreen