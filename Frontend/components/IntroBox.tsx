import React from "react";
import { StyleSheet, Text, View } from "react-native";

type textProp = {
  text: string
}

const IntroBox = (props: textProp) => {
    return (
        <View style={styles.container}>
            <Text style={styles.logoText}>{props.text}</Text>
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
      textAlign: 'center',
      fontSize: 36,
      fontStyle: 'normal',
      fontWeight: '400',
    }
  });
export default IntroBox