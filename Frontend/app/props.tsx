import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CatProps = {
    name: string;
}

const Cat = (props: CatProps) => {
    return (
        <View>
            <Text>Hello, I am {props.name}!</Text>
        </View>
    )
}

const Cafe2 = () => {
    return (
        <SafeAreaView>
            <Cat name="Nadman" />
            <Cat name="Nudrat" />
        </SafeAreaView>
    )
}

export default Cafe2;