

import React from "react";
import { StyleSheet, View } from "react-native";
import { SignoutButton } from "@/components/Buttons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import alert from "@/components/Alert";

const SettingsScreen = () => {

  /**
   * Signs out the user by removing the stored token 
   * and redirecting them to the login screen.
   */
  const signOut = async () => {
    await AsyncStorage.removeItem("token");
    router.dismissTo('/login')
  }

  /**
   * Displays a confirmation alert before signing out.
   */
  const throwAlert = () => {
    alert('Sign out', 'Are you sure?', [
        { text: 'Yes', onPress: () => signOut() },
        { text: 'No', onPress: () => { return } },
    ])
  }

  return (
    <View style={styles.mainContainer}>
        <View style={styles.signoutContainer}>
            <SignoutButton text="Sign out" onPress={throwAlert} height={'25%'} width={'30%'}/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFBDE",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
    },
    signoutContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: '30%',
        width: '100%',
    }
});

export default SettingsScreen;
