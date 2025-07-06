/**
 * Used as a box to welcome the users 
 * who log into the system. Without height 
 * and width being passed as props to the 
 * component, it defaults to 50% and 75% 
 * respectively. 
 */

import React from "react";
import { DimensionValue, StyleSheet, Text, View, ViewStyle } from "react-native";

type textProp = {
  text: string,
  height?: DimensionValue,
  width?: DimensionValue,
}

const IntroBox = (props: textProp) => {
  const dynamicStyle: ViewStyle = {
    height: props.height ?? '50%',
    width: props.width ?? '75%'
  }
    return (
        <View style={[styles.container, dynamicStyle]}>
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
      // height: '50%',
      // width: '75%',
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