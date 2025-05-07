import { Link } from 'expo-router';
import react from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Cat = () => {
  return (
    <View>
      <Text>I am also a cat!</Text>
    </View>
  )
}

const Cafe = () => {
  return (
    <SafeAreaView>
      <Text>
        Welcome!
      </Text>
      <Cat />
      <Cat />
      <Cat />
      <Link href={'/props'}>Learn Props here</Link>
      <Link href={'/usestate'}>Learn use-states here</Link>
    </SafeAreaView>
  )
}

export default Cafe;