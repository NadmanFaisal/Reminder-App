import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ReminderLogo = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.logoText}>Reminder App</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFBDE',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50%',
      width: '75%',
      borderWidth: 4,
    },
    logoText: {
      color: '#000',
      fontFamily: 'Inter',
      fontSize: 36,
      fontStyle: 'normal',
      fontWeight: '400',
    }
  });
export default ReminderLogo