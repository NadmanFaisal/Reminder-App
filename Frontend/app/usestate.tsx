import React, {useState} from "react";
import { View, Button, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

type CatProps = () => {
    name: string
}

const Cat = (props: CatProps) => {
    const [isHungry, setIsHungry] = useState(true);

    return (
        <View>
            <Text>
                I am {props.name}, and I am {isHungry ? 'hungry' : 'full'}!
            </Text>
            <Button
                onPress={() => {
                    setIsHungry(false);
                }}
                disabled={!isHungry}
                title={isHungry ? 'Give me some food, please!' : 'Thank you!'}
            />
        </View>
    )
}

const Cafe = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Cat name="Marshmallow" />
            <Cat name="Mylo" />
        </SafeAreaView>
    )
}

export default Cafe;